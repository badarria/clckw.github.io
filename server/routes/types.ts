import { City, Service } from 'db/models'

export type InitState = { city: typeof City[]; service: typeof Service[] }
export type FreeMasters = { id: number; surname: string; name: string; rating: number }[]
export type newOrder = { type: string; id: number; msg: string }
export type ConfirmMailType = {
  userEmail: string
  name: string
  begin: string
  city: string
  service: string
  master: string
}
export type DataForRatingRequest = { userEmail: string; name: string; id: string }
export type MailType = {
  body: {
    name: string
    intro: string
    table: {
      data: {
        'Order date': string
        City: string
        'Your master': string
        'Size of clock': string
      }[]
    }
    outro: string
  }
}
