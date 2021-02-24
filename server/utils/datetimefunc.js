const { DateTime } = require('luxon')

const toObjFromStr = (iso) => DateTime.fromISO(iso)
const toObjFromJSDate = (jsdate) => DateTime.fromJSDate(jsdate)

const checkThisDayTime = (date) => {
  const now = DateTime.local()
  const begin = DateTime.fromISO(date).setZone('utc')
  return begin >= now
}
const compareTime = (begin, finish) => {
  const endOfDay = DateTime.fromISO(begin).setZone('utc').set({ hours: 20, minutes: 0, seconds: 0 })
  const beginDate = DateTime.fromISO(begin).setZone('utc')
  const endDate = DateTime.fromISO(finish).setZone('utc')

  return endOfDay >= endDate && beginDate < endDate
}

const tsToUTC = (timestamp) => DateTime.fromJSDate(timestamp).setZone('utc')
const toTime = (timestamp) => DateTime.fromJSDate(timestamp).setZone('utc').toFormat('HH:mm')
const toDate = (timestamp) => DateTime.fromJSDate(timestamp).toFormat('EEE dd/MM/yyyy')

module.exports = { toObjFromStr, toObjFromJSDate, checkThisDayTime, compareTime, toTime, toDate, tsToUTC }
