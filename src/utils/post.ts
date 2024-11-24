import { getCollection } from 'astro:content';
import type { Lang } from '@/i18n';
import { 
  BLOG_CATEGORIES, 
  FUNDING_CATEGORIES, 
  type BlogCategoryId,
  type FundingCategoryId 
} from '@/data/categories';
import type { LocaleKey } from '@/data/types';

export interface CategoryWithId {
  id: string;
}

export const getCategories = async (locale: Lang): Promise<CategoryWithId[]> => {
  const posts = await getCollection('blog');
  const categorySet = new Set(
    posts
      .filter(post => post.slug.split('/')[0] === locale)
      .map(post => post.data.category)
  );
  
  const validCategories = Array.from(categorySet).filter((cat): cat is BlogCategoryId => 
    BLOG_CATEGORIES.categories.some(validCat => validCat.id === cat)
  );
  
  return validCategories.map(cat => ({
    id: cat
  }));
};

export const getFundingCategories = async (locale: Lang): Promise<CategoryWithId[]> => {
  const posts = await getCollection('funding');
  const categorySet = new Set(
    posts
      .filter(post => post.slug.split('/')[0] === locale)
      .map(post => post.data.category)
  );
  
  const validCategories = Array.from(categorySet).filter((cat): cat is FundingCategoryId => 
    FUNDING_CATEGORIES.categories.some(validCat => validCat.id === cat)
  );
  
  return validCategories.map(cat => ({
    id: cat
  }));
};

export const getPosts = async (max?: number, locale?: Lang) => {
  return (await getCollection('blog'))
    .filter(post => !post.data.draft && (!locale || post.slug.split('/')[0] === locale))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, max);
};

export const getFundingPosts = async (max?: number, locale?: Lang) => {
  return (await getCollection('funding'))
    .filter(post => !post.data.draft && (!locale || post.slug.split('/')[0] === locale))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, max);
};

export const getTags = async (locale: Lang) => {
  const posts = await getPosts(undefined, locale);
  const tags = new Set<string>();
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tags.add(tag.toLowerCase());
    });
  });
  return Array.from(tags);
};

export const getPostByTag = async (tag: string, locale: Lang) => {
  const posts = await getPosts(undefined, locale);
  const lowercaseTag = tag.toLowerCase();
  return posts.filter(post => {
    return post.data.tags?.some(postTag => postTag.toLowerCase() === lowercaseTag);
  });
};

export const filterPostsByCategory = async (category: string, locale: Lang) => {
  const posts = await getPosts(undefined, locale);
  if (!category) return posts;
  
  return posts.filter(post => 
    post.data.category.toLowerCase() === category.toLowerCase()
  );
};

export const filterFundingPostsByCategory = async (category: string, locale: Lang) => {
  const posts = await getFundingPosts(undefined, locale);
  if (!category) return posts;
  
  return posts.filter(post => 
    post.data.category.toLowerCase() === category.toLowerCase()
  );
};

// Type guards
export const isBlogCategory = (categoryId: string): categoryId is BlogCategoryId => {
  return BLOG_CATEGORIES.categories.some(cat => cat.id === categoryId);
};

export const isFundingCategory = (categoryId: string): categoryId is FundingCategoryId => {
  return FUNDING_CATEGORIES.categories.some(cat => cat.id === categoryId);
};

// Helper functions
export const getAllBlogCategories = (locale: Lang): CategoryWithId[] => {
  return BLOG_CATEGORIES.categories.map(cat => ({
    id: cat.id
  }));
};

export const getAllFundingCategories = (locale: Lang): CategoryWithId[] => {
  return FUNDING_CATEGORIES.categories.map(cat => ({
    id: cat.id
  }));
};

// Validation helpers
export const toBlogCategory = (category: string): BlogCategoryId | null => {
  return isBlogCategory(category) ? category : null;
};

export const toFundingCategory = (category: string): FundingCategoryId | null => {
  return isFundingCategory(category) ? category : null;
};