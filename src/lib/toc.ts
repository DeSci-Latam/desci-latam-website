import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { Node, Parent } from "unist";
import type { Root, Paragraph, Link, Text, List, ListItem } from "mdast";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

export interface Item {
  title: string;
  url: string;
  items?: Item[];
}

export interface Items {
  items?: Item[];
}

function flattenNode(node: Parent): string {
  const p: string[] = [];
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return;
    p.push((node as Text).value);
  });
  return p.join('');
}

function getItems(node: Node | undefined | null, current: Partial<Item>): Items | Item {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node as Paragraph, (item) => {
      if (item.type === "link") {
        current.url = (item as Link).url;
        current.title = flattenNode(node as Parent);
      }
      if (item.type === "text") {
        current.title = flattenNode(node as Parent);
      }
    });
    return current as Item;
  }

  if (node.type === "list") {
    current.items = ((node as List).children as Node[]).map((i) => getItems(i, {}) as Item);
    return current as Items;
  } else if (node.type === "listItem") {
    const heading = getItems((node as ListItem).children[0], {}) as Item;
    if ((node as ListItem).children.length > 1) {
      getItems((node as ListItem).children[1], heading);
    }
    return heading;
  }

  return {};
}

interface RemarkProcessor {
  data: {
    toc: Items;
  };
}

function remarkToc() {
  return function(node: Root, file: any) {
    const table = toc(node);
    file.data = file.data || {};
    file.data.toc = getItems(table.map, {}) as Items;
  };
}

export type TableOfContents = Items;

export async function getTableOfContents(content: string): Promise<TableOfContents> {
  const processor = remark().use(remarkToc);
  const result = await processor.process(content) as unknown as RemarkProcessor;
  
  if (!result.data?.toc) {
    return { items: [] };
  }
  
  return result.data.toc;
}