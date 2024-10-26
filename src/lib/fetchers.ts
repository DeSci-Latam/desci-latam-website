import { getCollection } from "astro:content";

export async function getCategories() {
  const posts = await getCollection("blog2");
  const categories = [
    ...new Set(posts.map((post) => post.data.category).flat()),
  ];

  return categories;
}

/* export async function getPosts() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return posts;
} */

export async function getPosts(locale: string) {
  const posts = (await getCollection("blog2"))
    .filter((post) => post.slug.startsWith(locale))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return posts;
}


export async function getPostsByCategory(category: string) {
  const posts = (await getCollection("blog2"))
    .filter((post) => post.data.category.includes(category))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return posts;
}

export async function getGuides() {
  const guides = (await getCollection("guides"))
    .filter((guide) => guide.data.published)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return guides;
}


