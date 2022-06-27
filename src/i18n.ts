import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_ko from './locales/ko/translation.json';

const resources = {
  ko: {
    translation: translation_ko
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;