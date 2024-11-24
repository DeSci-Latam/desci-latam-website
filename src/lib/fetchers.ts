import { getCollection } from "astro:content";
import type { Category } from "@/data/categories";
import { CATEGORIES } from "@/data/categories";
import type { Lang } from "@/i18n";

/* export async function getCategories() {
  const posts = await getCollection("blog");
  const categories = [
    ...new Set(posts.map((post) => post.data.category).flat()),
  ];

  return categories;
} */

/* export async function getPosts() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return posts;
} */

/* export async function getPosts(locale: string) {
  const posts = (await getCollection("blog"))
    .filter((post) => post.slug.startsWith(locale))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return posts;
} */


  function getCategoryTranslation(categoryId: string, locale: Lang) {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.translations[locale] : categoryId;
  }
  
  export async function getCategories(locale: Lang) {
    const posts = await getCollection("blog");
    const categoryIds = [...new Set(posts.map(post => post.data.category))];
    
    return categoryIds.map(id => ({
      id: id,
      name: getCategoryTranslation(id, locale)
    }));
  }
  
  
  export async function getPosts(locale: Lang) {
    const posts = (await getCollection("blog"))
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return posts;
  }
  
  export async function getPostsByCategory(categoryId: string, locale: Lang) {
    const posts = (await getCollection("blog"))
      .filter((post) => post.data.category === categoryId)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return posts;
  }
  
  export async function getGuides() {
    const guides = (await getCollection("guides"))
      .filter((guide) => guide.data.published)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
    return guides;
  }
  
  // Si necesitas más funciones de utilidad para las categorías
  export function getAllCategories(locale: Lang) {
    return CATEGORIES.map(category => ({
      id: category.id,
      name: category.translations[locale]
    }));
  }
  
  // Función helper para verificar si una categoría existe
  export function isCategoryValid(categoryId: string): boolean {
    return CATEGORIES.some(cat => cat.id === categoryId);
  }

/* 
export async function getPostsByCategory(category: string) {
  const posts = (await getCollection("blog"))
    .filter((post) => post.data.category.includes(category))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return posts;
}

export async function getGuides() {
  const guides = (await getCollection("guides"))
    .filter((guide) => guide.data.published)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return guides;
} */


