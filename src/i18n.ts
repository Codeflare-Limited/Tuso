import { Language } from "./interface/Language";

export const defaultLang = { code: "en", label: "English" }
const allLanguage: Language[] = [

]


const TEST_LANG_CODE = "__test__";
let currentLang: Language = defaultLang;

export const t = (path: string, replacement?: { [key: string]: string }) => {
    if (currentLang.code.startsWith(TEST_LANG_CODE)) {
      const name = replacement
        ? `${path}(${JSON.stringify(replacement).slice(1, -1)})`
        : path;
      return `\u{202a}[[${name}]]\u{202c}`;
    }
}     