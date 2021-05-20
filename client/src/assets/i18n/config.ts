import i18n from 'i18next'
import { enHeader, enBlog, enMasters, enPayment, enSearch } from './en'
import { ruHeader, ruBlog, ruMasters, ruPayment, ruSearch } from './ru'
import { uaHeader, uaBlog, uaMasters, uaPayment, uaSearch } from './ua'

import { initReactI18next } from 'react-i18next'

const en = {
  header: enHeader,
  blog: enBlog,
  masters: enMasters,
  payment: enPayment,
  search: enSearch,
} as const
type Translation = typeof en

const ru: Translation = {
  header: ruHeader,
  blog: ruBlog,
  masters: ruMasters,
  payment: ruPayment,
  search: ruSearch,
}

const ua: Translation = {
  header: uaHeader,
  blog: uaBlog,
  masters: uaMasters,
  payment: uaPayment,
  search: uaSearch,
}

export const resources = { en, ru, ua }

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['header', 'blog', 'masters', 'payment', 'search'],
  resources,
})

// todo: extract this definition into its own module declaration (react-i18next.d.ts)
// take a look at https://react.i18next.com/latest/typescript
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
declare module 'react-i18next' {
  interface Resources {
    header: typeof enHeader
    blog: typeof enBlog
    masters: typeof enMasters
    payment: typeof enPayment
    search: typeof enSearch
  }
}
