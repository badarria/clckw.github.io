const beginKey = 'begin';
const endKey = 'end';
const cityKey = 'city_id';
const masterKey = 'master';
const idKey = 'id';
const dateKey = 'date'

const getNum = (str) => {
	return Number(str.split(':')[0]);
}
const getTimeStr = (num) => {
	return `${num}:00`;
}


const workingHours = (begin, end, serviceTime = 1) => {
	const endTime = end - Number(serviceTime);
	let res = [];
	for (let i = begin; i <= endTime; i += 1) {
		res.push(getTimeStr(i));
	}
	return res;
}

const findBookedTime = (orders) => {
	return orders.reduce((acc, {[beginKey]: beginTime, [endKey]: endTime}) => {
		for (let i = getNum(beginTime); i < getNum(endTime); i += 1) {
			acc.push(getTimeStr(i));
		}
		return acc
	}, [])
}

const getHoursArray = (orders, service_time,  dayBegin = 8, dayEnd = 20) => {
	const workDay = workingHours(dayBegin, dayEnd, service_time);
	const bookedTime = findBookedTime(orders);
	const res =  workDay.reduce((acc, hour) => {
		const booked = bookedTime.includes(hour)
		acc = [...acc, {hour: hour, booked: booked}]
		return acc;
	}, [])
	return res
}

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


export {workingHours, findBookedTime, getHoursArray}

// const masters = [{id:8, name:'zzz', surname:'zzzz', cityId: 2, rating:5}, {id:3, name:'zzz', surname:'zzzz', cityId: 2, rating:5}, {id:4, name:'zzz', surname:'zzzz', cityId: 3, rating:5}]
// const date = '09/11/20'
// const ord = [
// 	{id: 5, name: "Lesha", master: 3, date: "09/11/20", begin: ("12:00"), end: ('13:00'), cityId: 2},
// 	{id: 5, name: "ivan", master: 3, date: "09/11/20", begin: ("10:00"), end: ('12:00'), cityId: 2},
// ]
//
// console.log(getTimeArray(ord, 3, 3,"09/11/20" ))