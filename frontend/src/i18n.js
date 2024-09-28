import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationGU from "./locales/gu/translation.json";
import translationHI from "./locales/hi/translation.json";

import homeEN from "./locales/en/home.json";
import homeGU from "./locales/gu/home.json";
import homeHI from "./locales/hi/home.json";

import navEN from "./locales/en/nav.json";
import navGU from "./locales/gu/nav.json";
import navHI from "./locales/hi/nav.json";

import authEN from "./locales/en/auth.json";
import authGU from "./locales/gu/auth.json";
import authHI from "./locales/hi/auth.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    default: "en",
    fallbackLng: "en",
    returnObjects: true,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: translationEN,
        home: homeEN,
        nav: navEN,
        auth: authEN,
      },
      gu: {
        translation: translationGU,
        home: homeGU,
        nav: navGU,
        auth: authGU,
      },
      hi: {
        translation: translationHI,
        home: homeHI,
        nav: navHI,
        auth: authHI,
      },
    },
  });

export default i18n;
