import type { LocaleKey } from "@/data/types";

export type Lang = LocaleKey;

export const LOCALES: Record<Lang, string> = {
  es: "Español",
  en: "English",
  pt: "Português"
};