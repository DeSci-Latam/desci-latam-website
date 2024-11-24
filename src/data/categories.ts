import type { Lang } from "@/i18n";

export type CategoryTranslations = {
  [K in Lang]: string;
};

export type Category = {
  id: string;
  translations: CategoryTranslations;
};

export const CATEGORIES: Category[] = [
  {
    id: "science",
    translations: {
      es: "Ciencia",
      en: "DAO",
      pt: "DAO"
    }
  },
  {
    id: "dao",
    translations: {
      es: "DAO",
      en: "DAO",
      pt: "DAO"
    }
  },
  {
    id: "crowdfunding",
    translations: {
      es: "Financiamiento Colectivo",
      en: "Crowdfunding",
      pt: "Financiamento Coletivo"
    }
  },
  // ... resto de las categorías
] as const;

export const CATEGORY_IDS = CATEGORIES.map(cat => cat.id) as [string, ...string[]];