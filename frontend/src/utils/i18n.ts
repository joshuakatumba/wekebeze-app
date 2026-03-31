import en from "../assets/locales/en.json";
import lg from "../assets/locales/lg.json";

const LOCALES: Record<string, any> = { en, lg };

export function t(key: string, lang: string = "en"): any {
  const parts = key.split(".");
  let obj = LOCALES[lang] || LOCALES["en"];
  for (const p of parts) {
    obj = obj?.[p];
    if (obj === undefined) return key;
  }
  return obj;
}
