export interface Locale {
  code: string;
  language: string;
  name: string;
  file: string;
  isCatchallLocale?: boolean;
}

const locales = [
  {
    code: "en",
    language: "en-US",
    name: "English",
    file: "en-US.json",
    isCatchallLocale: true,
  },
  {
    code: "de",
    language: "de",
    name: "Deutsch",
    file: "de.json",
  },
  {
    code: "es",
    language: "es",
    name: "Español",
    file: "es.json",
  },
  {
    code: "fr",
    language: "fr",
    name: "Français",
    file: "fr.json",
  },
  {
    code: "pt",
    language: "pt",
    name: "Português",
    file: "pt.json",
  },
] as const;

export type LocaleCode = (typeof locales)[number]["code"];
export type LocaleName = (typeof locales)[number]["name"];

export default locales as unknown as Locale[];
