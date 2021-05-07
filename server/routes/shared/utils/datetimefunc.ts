import { DateTime } from 'luxon'

const toObjFromStr = (iso: string) => DateTime.fromISO(iso)
const toObjFromJSDate = (jsdate: Date) => DateTime.fromJSDate(jsdate)

const checkThisDayTime = (date: string) => {
  const now = DateTime.local()
  const begin = DateTime.fromISO(date)

  return begin >= now
}
const compareTime = (begin: string, finish: string) => {
  const endOfDay = DateTime.fromISO(begin).set({ hour: 20, minute: 0, second: 0 })
  const beginDate = DateTime.fromISO(begin)
  const endDate = DateTime.fromISO(finish)

  return endOfDay >= endDate && beginDate < endDate
}

const toTime = (timestamp: Date | string) => {
  if (typeof timestamp === 'string') {
    return DateTime.fromISO(timestamp, { zone: 'Europe/Kiev' }).toFormat('HH:mm')
  }
  return DateTime.fromJSDate(timestamp, { zone: 'Europe/Kiev' }).toFormat('HH:mm')
}

const toDate = (timestamp: Date | string) => {
  if (typeof timestamp === 'string') {
    return DateTime.fromISO(timestamp, { zone: 'Europe/Kiev' }).toFormat('EEE dd/MM/yyyy')
  }
  return DateTime.fromJSDate(timestamp, { zone: 'Europe/Kiev' }).toFormat('EEE dd/MM/yyyy')
}

const toSchedulerFormat = (date: Date) =>
  DateTime.fromJSDate(date)
    .toISO()
    .replace(/(\..+)/, '')

export { toObjFromStr, toObjFromJSDate, checkThisDayTime, compareTime, toTime, toDate, toSchedulerFormat }
