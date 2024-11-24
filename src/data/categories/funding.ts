import type { Category } from '../types';
import { createCategories } from '../types';

export type FundingCategoryId = 
  | 'grants'
  | 'fellowships'
  | 'scholarships'
  | 'research'
  | 'projects'
  | 'others';

const fundingCategories: Category[] = [
  {
    id: 'grants',
    translations: {
      es: 'Subvenciones',
      en: 'Grants',
      pt: 'Subsídios'
    }
  },
  {
    id: 'fellowships',
    translations: {
      es: 'Becas de Investigación',
      en: 'Fellowships',
      pt: 'Bolsas de Pesquisa'
    }
  },
  {
    id: 'scholarships',
    translations: {
      es: 'Becas de Estudio',
      en: 'Scholarships',
      pt: 'Bolsas de Estudo'
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
    id: 'projects',
    translations: {
      es: 'Proyectos',
      en: 'Projects',
      pt: 'Projetos'
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

export const FUNDING_CATEGORIES = createCategories<FundingCategoryId>(fundingCategories);