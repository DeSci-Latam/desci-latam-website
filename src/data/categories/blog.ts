import type { Category } from '../types';
import { createCategories } from '../types';

export type BlogCategoryId = 
  | 'science'
  | 'technology'
  | 'community'
  | 'research'
  | 'events'
  | 'others';

const blogCategories: Category[] = [
  {
    id: 'science',
    translations: {
      es: 'Ciencia',
      en: 'Science',
      pt: 'Ciência'
    }
  },
  {
    id: 'technology',
    translations: {
      es: 'Tecnología',
      en: 'Technology',
      pt: 'Tecnologia'
    }
  },
  {
    id: 'community',
    translations: {
      es: 'Comunidad',
      en: 'Community',
      pt: 'Comunidade'
    }
  },
  {
    id: 'research',
    translations: {
      es: 'Investigación',
      en: 'Research',
      pt: 'Pesquisa'
    }
  },
  {
    id: 'events',
    translations: {
      es: 'Eventos',
      en: 'Events',
      pt: 'Eventos'
    }
  },
  {
    id: 'dao',
    translations: {
      es: 'DAO',
      en: 'DAO',
      pt: 'DAO'
    }
  },
  {
    id: 'desci',
    translations: {
      es: 'DeSci',
      en: 'DeSci',
      pt: 'DeSCi'
    }
  },
  {
    id: 'gitcoin',
    translations: {
      es: 'Gitcoin',
      en: 'Gitcoin',
      pt: 'Gitcoin'
    }
  },
  {
    id: 'others',
    translations: {
      es: 'Otros',
      en: 'Others',
      pt: 'Outros'
    }
  }
];

export const BLOG_CATEGORIES = createCategories<BlogCategoryId>(blogCategories);