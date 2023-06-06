import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Welcome to my app': 'Welcome to my app',
      'Hello, {{name}}': 'Hello, {{name}}'
    }
  },
  fr: {
    translation: {
      'Welcome to my app': 'Bienvenue sur mon application',
      'Hello, {{name}}': 'Bonjour, {{name}}'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;