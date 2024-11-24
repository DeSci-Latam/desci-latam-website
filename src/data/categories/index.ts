// Exportamos los tipos
export type { Category, LocaleKey } from '../types';
export { createCategories } from '../types';

// Exportamos las categorías específicas
export * from './blog';
export * from './funding';

import type { LocaleKey, Category } from '../types';
import { BLOG_CATEGORIES } from './blog';
import { FUNDING_CATEGORIES } from './funding';

// Exportamos la función de traducción
export function getCategoryTranslation(
  categoryId: string,
  locale: LocaleKey,
  collection: 'blog' | 'funding'
): string {
  const categoriesMap = {
    blog: BLOG_CATEGORIES.categories,
    funding: FUNDING_CATEGORIES.categories
  };

  const category = categoriesMap[collection].find((cat: Category) => cat.id === categoryId);
  return category ? category.translations[locale] : categoryId;
}