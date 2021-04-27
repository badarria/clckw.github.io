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
const toTime = (timestamp: Date | string) => {
  if (typeof timestamp === 'string') {
    return DateTime.fromISO(timestamp).setZone('utc').toFormat('HH:mm')
  }
  return DateTime.fromJSDate(timestamp).setZone('utc').toFormat('HH:mm')
}
const toDate = (timestamp: Date | string) => {
  if (typeof timestamp === 'string') {
    return DateTime.fromISO(timestamp).toFormat('EEE dd/MM/yyyy')
  }
  return DateTime.fromJSDate(timestamp).toFormat('EEE dd/MM/yyyy')
}
// '2021-04-24T12:00'
const toSchedulerFormat = (date: Date) =>
  DateTime.fromJSDate(date)
    .toISO()
    .replace(/(\..+)/, '')

export { toObjFromStr, toObjFromJSDate, checkThisDayTime, compareTime, toTime, toDate, tsToUTC, toSchedulerFormat }
