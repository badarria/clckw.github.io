import { DateTime } from 'luxon'

const beginKey = 'begin'
const endKey = 'finish'

const getNum = (str) => Number(str.split(':')[0])

const getTimeStr = (num) => (num < 10 ? `0${num}:00` : `${num}:00`)

const getWorkingHours = (begin, end, serviceTime = 1) => {
  const endTime = end - Number(serviceTime)
  let res = []
  for (let i = begin; i <= endTime; i += 1) {
    res.push(getTimeStr(i))
  }
  return res
}

const findBookedTime = (orders) => {
  return orders.reduce((acc, { [beginKey]: beginTime, [endKey]: endTime }) => {
    for (let i = getNum(beginTime); i < getNum(endTime); i += 1) {
      acc.push(getTimeStr(i))
    }
    return acc
  }, [])
}

export const toMailFormat = (str) => DateTime.fromISO(str).toFormat('EEE dd.MM.yy HH:mm')

export const getHoursArray = (service_time, orders = [], dayBegin = 8, dayEnd = 20) => {
  const workDay = getWorkingHours(dayBegin, dayEnd, service_time)
  const bookedTime = findBookedTime(orders)
  return workDay.reduce((acc, hour) => {
    const booked = bookedTime.includes(hour)
    acc = [...acc, { hour: hour, booked: booked }]
    return acc
  }, [])
}

export const dateFromFormatToObj = (date) => DateTime.fromFormat(date, 'EEE dd/MM/yyyy').toJSDate()

export const dateFromNewDate = () => DateTime.fromJSDate(new Date()).set({ hours: 0, minutes: 0, seconds: 0 }).toJSDate()

export const dateToRequest = (date) => {
  if (date instanceof Date) {
    return DateTime.fromJSDate(date).toJSON().replace(/\+.+$/, '')
  } else return date
}

export const setDisabled = (data) => {
  return data.map((item) => {
    const endAt = DateTime.fromFormat(`${item.date} ${item.finish}`, 'EEE dd/MM/yyyy HH:mm').diffNow()
    if (endAt.values.milliseconds < 1) {
      item.disabled = true
    }
    return item
  })
}

export const getBeginFinish = (date, hours, service_time) => {
  let begin = DateTime.fromJSDate(date)
    .set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    .plus({ hours: hours.split(':')[0] })
    .toJSDate()
  const finish = DateTime.fromJSDate(begin).plus({ hours: service_time }).toISO().replace(/\+.+$/, '+0000')
  begin = DateTime.fromJSDate(begin).toISO().replace(/\+.+$/, '+0000')

  return { finish, begin }
}
