const beginKey = 'startAt';
const endKey = 'endAt';
const cityKey = 'cityId';
const masterKey = 'masterId';
const idKey = 'id';

const getNum = (str) => {
	return Number(str.split(':')[0]);
}
const getTimeStr = (num) => {
	return `${num}:00`;
}
const getDateValue = (str, inx = 1) => {
	return str.split(' ')[inx];
}
const getTimeValue = (str, inx = 2) => {
	return getNum(str.split(' ')[inx]);
}

const workingHours = (begin, end, serviceTime = 1) => {
	const endTime = end - serviceTime;
	let res = [];
	for (let i = begin; i <= endTime; i += 1) {
		res.push(getTimeStr(i));
	}
	return res;
}

const findDisabled = (orders, date) => {
	const res = orders.reduce((acc, {[beginKey]: value1, [endKey]: value2}) => {
		const orderDate = getDateValue(value1);
		const orderStartTime = getTimeValue(value1);
		const orderEndTime = getTimeValue(value2, 1);
		if (orderDate === date) {
			for (let i = orderStartTime; i < orderEndTime; i += 1) {
				acc.push(getTimeStr(i));
			}
		}
		return acc
	}, [])
	return res;
}

const findFreeMasters = (orders, masters, city, date, beginAtTime, endAtTime) => {

	const busyMasters = orders.filter(({[cityKey]: value}) => value === city)
		.filter((order) => getDateValue(order[beginKey]) === date)
		.reduce((acc, order) => {
			const orderBegin = getTimeValue(order[beginKey]);
			const orderEnd = getTimeValue(order[endKey], 1);
			const beginTime = getTimeValue(beginAtTime);
			const endTime = getTimeValue(endAtTime, 1);

			if (endTime <= orderBegin || beginTime >= orderEnd) {
				acc.push(order[masterKey])
			}
			return acc;
		}, [])

	const freeMasters = masters
		.filter(({[cityKey]: value}) => value === city)
		.reduce((acc, master) => {
			const id = master[idKey];
			console.log(busyMasters.includes(id), id, busyMasters)
			!busyMasters.includes(id) && (acc.push(master));
			return acc;
		}, [])

	return freeMasters;
}

export {workingHours, findFreeMasters, findDisabled}

// const masters = [{id:8, name:'zzz', surname:'zzzz', cityId: 2, rating:5}, {id:3, name:'zzz', surname:'zzzz', cityId: 2, rating:5}, {id:4, name:'zzz', surname:'zzzz', cityId: 3, rating:5}]
// const date = '09/11/20'
// const ord = [{id: 5, name: "Lesha", masterId: 3, startAt: ("Mon 09/11/20 12:00"), endAt: ('09/11/20 13:00'), cityId: 2}, {
// 	id: 5,
// 	masterId: 4,
// 	name: "Lesha",
// 	startAt: ("Mon 09/11/20 15:00"),
// 	endAt: ('09/11/20 18:00'),
// 	cityId: 3
// }]
//
// console.log(findFreeMasters(ord,masters,2, date, "Mon 09/11/20 15:00", '09/11/20 16:00'))