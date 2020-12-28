import {DateTime} from "luxon";

const beginKey = 'begin';
const endKey = 'end';


const _getNum = (str) => {
	return Number(str.split(':')[0]);
}
const _getTimeStr = (num) => {
	return num < 10 ? `0${num}:00`:`${num}:00`;
}

const _getWorkingHours = (begin, end, serviceTime = 1) => {
	const endTime = end - Number(serviceTime);
	let res = [];
	for (let i = begin; i <= endTime; i += 1) {
		res.push(_getTimeStr(i));
	}
	return res;
}

const _findBookedTime = (orders) => {
	return orders.reduce((acc, {[beginKey]: beginTime, [endKey]: endTime}) => {
		for (let i = _getNum(beginTime); i < _getNum(endTime); i += 1) {
			acc.push(_getTimeStr(i));
		}
		return acc
	}, [])
}

const getHoursArray = (service_time, orders = [], dayBegin = 8, dayEnd = 20) => {
	const workDay = _getWorkingHours(dayBegin, dayEnd, service_time);
	const bookedTime = _findBookedTime(orders);
	const res = workDay.reduce((acc, hour) => {
		const booked = bookedTime.includes(hour)
		acc = [...acc, {hour: hour, booked: booked}]
		return acc;
	}, [])
	return res
}


export const dateFromFormatToObj = (date) => DateTime.fromFormat(date, 'EEE dd/MM/yyyy').toJSDate();
export const dateFromNewDate = () => DateTime.fromJSDate(new Date()).set({hours: 0, minutes: 0, seconds: 0}).toJSDate();
export const dateToRequest = (date) => DateTime.fromJSDate(date).toJSON()
export const getBeginEnd = (date, hours, service_time) => {
	let begin = DateTime.fromJSDate(date).set({hours: 0, minutes: 0, seconds: 0}).plus({hours: hours.split(':')[0]}).toJSDate();
	const interval = Number(service_time)
	const end = DateTime.fromJSDate(begin).plus({hours: interval}).toJSON();
	begin = DateTime.fromJSDate(begin).toJSON()
	return { end, begin}
}



export {getHoursArray}

