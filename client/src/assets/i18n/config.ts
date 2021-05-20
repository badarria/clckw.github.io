import i18n from 'i18next'
import enTrans from './en/translation.json'
import uaTrans from './ua/translation.json'
import ruTrans from './ru/translation.json'

import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: enTrans,
  },
  ru: {
    translation: ruTrans,
  },
  ua: {
    translation: uaTrans,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
})
