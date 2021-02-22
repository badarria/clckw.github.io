const { DateTime } = require('luxon')

const toObjFromStr = (iso) => DateTime.fromISO(iso)
const toObjFromJSDate = (jsdate) => DateTime.fromJSDate(jsdate)

const checkThisDayTime = (date) => {
  const now = DateTime.local()
  const begin = DateTime.fromISO(date)
  return begin >= now
}
const compareTime = (begin, finish) => {
  const endOfDay = DateTime.fromISO(begin).set({ hours: 20, minutes: 0, seconds: 0 })
  const beginDate = DateTime.fromISO(begin)
  const endDate = DateTime.fromISO(finish)

  return endOfDay >= endDate && beginDate < endDate
}
const toTime = (timestamp) => DateTime.fromJSDate(timestamp).toFormat('HH:mm')
const toDate = (timestamp) => DateTime.fromJSDate(timestamp).toFormat('EEE dd/MM/yyyy')

module.exports = { toObjFromStr, toObjFromJSDate, checkThisDayTime, compareTime, toTime, toDate }
