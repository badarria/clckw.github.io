const beginKey = 'begin';
const endKey = 'end';
// const cityKey = 'city_id';
// const masterKey = 'master';
// const idKey = 'id';
// const dateKey = 'date'

const _getNum = (str) => {
	return Number(str.split(':')[0]);
}
const _getTimeStr = (num) => {
	return `${num}:00`;
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


const dateString = (date) => date.toString().match(/\w{3} \d\d \d{4}/)[0]

const dateTimeString = (date, hours, interval = 1) => {
	const endTime = _getTimeStr(_getNum(hours) + Number(interval))
	return {
		begin: `${date} ${hours}`, end: `${date} ${endTime}`
	}
}

// const example = dateString('Mon Dec 14 2020 11:23:59 GMT+0200 (Восточная Европа, стандартное время)')
// console.log(dateTimeString(example, '18:00'))
//
// const findFreeMasters = (orders, masters, city, date, beginAtTime, endAtTime) => {
//
// 	const busyMasters = orders.filter(({[cityKey]: value}) => value === city)
// 		.filter((order) => getDateValue(order[beginKey]) === date)
// 		.reduce((acc, order) => {
// 			const orderBegin = getTimeValue(order[beginKey]);
// 			const orderEnd = getTimeValue(order[endKey], 1);
// 			const beginTime = getTimeValue(beginAtTime);
// 			const endTime = getTimeValue(endAtTime, 1);
//
// 			if (endTime <= orderBegin || beginTime >= orderEnd) {
// 				acc.push(order[masterKey])
// 			}
// 			return acc;
// 		}, [])
//
// 	const freeMasters = masters
// 		.filter(({[cityKey]: value}) => value === city)
// 		.reduce((acc, master) => {
// 			const id = master[idKey];
// 			console.log(busyMasters.includes(id), id, busyMasters)
// 			!busyMasters.includes(id) && (acc.push(master));
// 			return acc;
// 		}, [])
//
// 	return freeMasters;
// }


export {getHoursArray, dateTimeString, dateString}