import { getCollection, type CollectionEntry } from "astro:content";
import type { Category, LocaleKey } from "@/data/types";
import { BLOG_CATEGORIES, FUNDING_CATEGORIES } from "@/data/categories";
import type { Lang } from "@/i18n";

export interface CategoryWithName {
  id: string;
  name: string;
}

export async function getCategories(locale: Lang): Promise<CategoryWithName[]> {
  // Obtenemos las categorías definidas según el tipo de post
  const posts = await getCollection("blog");
  const localePosts = posts.filter(post => post.slug.startsWith(locale + '/'));
  const categoryIds = new Set(localePosts.map(post => post.data.category));

  return Array.from(categoryIds).map((id) => ({
    id,
    name: getBlogCategoryTranslation(id, locale as LocaleKey)
  }));
}

function getBlogCategoryTranslation(categoryId: string, locale: LocaleKey): string {
  const category = BLOG_CATEGORIES.categories.find((cat: Category) => cat.id === categoryId);
  return category ? category.translations[locale] : categoryId;
}

export function getAllCategories(locale: Lang): CategoryWithName[] {
  return BLOG_CATEGORIES.categories.map((category: Category) => ({
    id: category.id,
    name: category.translations[locale as LocaleKey]
  }));
}

export function isCategoryValid(categoryId: string): boolean {
  return BLOG_CATEGORIES.categories.some((cat: Category) => cat.id === categoryId);
}

export async function getPosts(locale: Lang) {
  const posts = await getCollection("blog");
  return posts
    .filter(post => 
      !post.data.draft && 
      post.slug.startsWith(locale + '/')
    )
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsByCategory(categoryId: string, locale: Lang) {
  if (!isCategoryValid(categoryId)) {
    throw new Error(`Invalid category: ${categoryId}`);
  }

  const posts = await getCollection("blog");
  return posts
    .filter(post => 
      post.data.category === categoryId && 
      !post.data.draft &&
      post.slug.startsWith(locale + '/')
    )
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function filterPostsByCategory(category: string, locale: Lang) {
  if (!isCategoryValid(category)) {
    return []; // Retorna array vacío si la categoría no es válida
  }

  const posts = await getPosts(locale);
  return posts.filter(post => post.data.category === category);
}

export async function getGuides() {
  return (await getCollection("guides"))
    .filter(guide => guide.data.published && !guide.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export interface CategoryWithPosts extends CategoryWithName {
  posts: CollectionEntry<"blog">[];
}

export async function getCategoriesWithPosts(locale: Lang): Promise<CategoryWithPosts[]> {
  const categories = getAllCategories(locale);
  const posts = await getPosts(locale);

  return Promise.all(
    categories.map(async (category) => ({
      ...category,
      posts: posts.filter(post => post.data.category === category.id)
    }))
  );
}

export async function getRelatedPosts(
  currentPost: CollectionEntry<"blog">, 
  locale: Lang, 
  limit = 3
) {
  const posts = await getPosts(locale);
  
  return posts
    .filter(post => 
      post.id !== currentPost.id && 
      post.data.category === currentPost.data.category
    )
    .slice(0, limit);
}