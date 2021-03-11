import { HoursArray, FilteredOrders, Order } from 'types'
import { DateTime } from 'luxon'

const beginKey = 'begin'
const endKey = 'finish'

const getNum = (str: string) => Number(str.split(':')[0]) as number

const getTimeStr = (num: number) => (num < 10 ? `0${num}:00` : `${num}:00`) as string

const getWorkingHours = (begin: number, end: number, serviceTime = '1') => {
  const endTime = end - Number(serviceTime)
  let res: string[] = []
  for (let i = begin; i <= endTime; i += 1) {
    res.push(getTimeStr(i))
  }
  return res
}

const findBookedTime = (orders: FilteredOrders) =>
  orders.reduce((acc: string[], { [beginKey]: beginTime, [endKey]: endTime }) => {
    for (let i = getNum(beginTime); i < getNum(endTime); i += 1) {
      acc.push(getTimeStr(i))
    }
    return acc
  }, []) as string[]

export const toMailFormat = (str: string) => DateTime.fromISO(str).toFormat('EEE dd.MM.yy HH:mm')

export const getHoursArray = (service_time: string, orders: FilteredOrders = [], dayBegin = 8, dayEnd = 20) => {
  const workDay = getWorkingHours(dayBegin, dayEnd, service_time)
  const bookedTime = findBookedTime(orders)
  return workDay.reduce((acc: HoursArray, hour) => {
    const booked = bookedTime.includes(hour)
    acc = [...acc, { hour: hour, booked: booked }]
    return acc
  }, [])
}

export const dateFromFormatToObj = (date: string) => DateTime.fromFormat(date, 'EEE dd/MM/yyyy').toJSDate()
export const dateFromNewDate = () => DateTime.fromJSDate(new Date()).set({ hour: 0, minute: 0, second: 0 }).toJSDate()
export const dateToRequest = (date: Date) => DateTime.fromJSDate(date).toJSON().replace(/\+.+$/, '')

export const pastTime = (hoursArr: HoursArray, currentDate = new Date()) => {
  const now = new Date()
  return hoursArr.map(({ hour, booked }) => {
    const currentDateTime = DateTime.fromJSDate(currentDate)
      .set({ hour: getNum(hour), minute: 0, second: 0 })
      .toJSDate()
    return { hour, booked: currentDateTime <= now }
  })
}

export const setDisabled = (data: Order[]) =>
  data.map((item) => {
    const endAt = DateTime.fromFormat(`${item.date} ${item.finish}`, 'EEE dd/MM/yyyy HH:mm').diffNow()
    if (endAt.milliseconds < 1) {
      return { ...item, disabled: true }
    }
    return { ...item, disabled: false }
  })

export const getBeginFinish = (date: Date, hours: string, service_time: string) => {
  let begin: Date | string = DateTime.fromJSDate(date)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .plus({ hours: Number(hours.split(':')[0]) })
    .toJSDate()
  const finish = DateTime.fromJSDate(begin)
    .plus({ hours: Number(service_time) })
    .toISO()
    .replace(/\+.+$/, '+0000')
  begin = DateTime.fromJSDate(begin).toISO().replace(/\+.+$/, '+0000')

  return { finish, begin }
}