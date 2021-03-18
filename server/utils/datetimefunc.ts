import { DateTime } from 'luxon'

const toObjFromStr = (iso: string) => DateTime.fromISO(iso)
const toObjFromJSDate = (jsdate: Date) => DateTime.fromJSDate(jsdate)

const checkThisDayTime = (date: string) => {
  const now = DateTime.local()
  const begin = DateTime.fromISO(date).setZone('utc')
  return begin >= now
}
const compareTime = (begin: string, finish: string) => {
  const endOfDay = DateTime.fromISO(begin).setZone('utc').set({ hour: 20, minute: 0, second: 0 })
  const beginDate = DateTime.fromISO(begin).setZone('utc')
  const endDate = DateTime.fromISO(finish).setZone('utc')

  return endOfDay >= endDate && beginDate < endDate
}

const tsToUTC = (timestamp: Date) => DateTime.fromJSDate(timestamp).setZone('utc')
const toTime = (timestamp: Date) => DateTime.fromJSDate(timestamp).setZone('utc').toFormat('HH:mm')
const toDate = (timestamp: Date) => DateTime.fromJSDate(timestamp).toFormat('EEE dd/MM/yyyy')

export { toObjFromStr, toObjFromJSDate, checkThisDayTime, compareTime, toTime, toDate, tsToUTC }