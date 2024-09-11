import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    default: "en",
    fallbackLng: "en",
    returnObjects: true,
    resources: {
      en: {
        translation: {
          greetings: "Hello from the Melodi Team",
          description: {
            part1: "I welcome you to our IPR Project frontend",
            part2: "We make sure that our work is always top-notch",
          }
        },
      },
      hi: {
        translation: {
          greetings: "मेलोडी टीम से नमस्ते",
          description: {
            part1: "मैं आपका स्वागत करता हूं हमारे आईपीआर परियोजना फ्रंटएंड में",
            part2: "हम सुनिश्चित करते हैं कि हमारा काम हमेशा शीर्ष-गुणवत्ता हो",
          }
        },
      },
      gu: {
        translation: {
          greetings: "મેલોડી ટીમથી નમસ્તે",
          description: {
            part1: "હું તમારું આઈપીઆર પ્રોજેક્ટ ફ્રન્ટએન્ડ પર આપનું સ્વાગત કરું છું",
            part2: "અમે ખરેખર ખાતરી કરીએ છીએ કે અમારું કામ હંમેશા ટોપ-નોચ છે",
          }
        },
      },
    },
  });
