export const DEFAULT_LOCALE_SETTING = "es";

export const LOCALES_SETTING: LocaleSetting = {
  "es": {
    "label": "Español"
  },
  
  "en": {
    "label": "English"
  },
 
  "pt": {
    "label": "Português"
  },
};

interface LocaleSetting {
  [key: Lowercase<string>]: {
    label: string;
    lang?: string;
    dir?: 'rtl' | 'ltr';
  };
 }
