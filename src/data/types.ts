export interface Category {
  id: string;
  translations: {
    es: string;
    en: string;
    pt: string;
  };
}

export type LocaleKey = 'es' | 'en' | 'pt';

export function createCategories<T extends string>(categories: Category[]) {
  return {
    categories,
    ids: categories.map(c => c.id) as [T, ...T[]]
  };
}