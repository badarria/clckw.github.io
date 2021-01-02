export const subjects = [
  ["customers", ["id", "name", "surname", "email"]],
  ["services", ["id", "name", "time"]],
  ["masters", ["id", "name", "surname", "city", "rating"]],
  [
    "orders",
    ["id", "service", "master", "customer", "city", "date", "begin", "end"],
  ],
  ["cities", ["id", "name"]],
];

///Services
// const errorCases = (label, data) => {
// 	let error;
// 	switch (label) {
// 		case "name":
// 			error = !data.match(/^[a-z0 -9_-]*$/i) ? 'Incorrect characters' :
// 				data.length < 2 ? 'Name is too short' :
// 					data.length > 16 ? "Name is too long" : '';
// 			break;
// 		case "time":
// 			error = !data.match(/^\d+$/) ? 'Only digits' : !data.match(/^[1-7]$/) ? 'from 1 to 7 hours' : '';
// 			break;
// 		default:
// 			break;
// 	}
// 	return error;
// }
// const helperText = (label) => {
// 	let text = '';
// 	switch (label) {
// 		case 'id':
// 			text = 'Unique id';
// 			break;
// 		case 'name':
// 			text = 'Unique service name';
// 			break;
// 		case 'time':
// 			text = 'Duration, hours';
// 			break;
// 		default:
// 			break;
// 	}
// 	return text;
// }
// Cities
// const errorCases = (label, data) => {
// 	let error;
// 	switch (label) {
// 		case "name":
// 			error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
// 				data.length < 2 ? 'Name is too short' :
// 					data.length > 16 ? "Name is too long" : '';
// 			break;
// 		default:
// 			break;
// 	}
// 	return error;
// }
// const helperText = (label) => {
// 	let text = '';
// 	switch (label) {
// 		case 'id':
// 			text = 'Unique id';
// 			break;
// 		case 'name':
// 			text = 'Unique city name';
// 			break;
// 		default:
// 			break;
// 	}
// 	return text;
// }

// Customers
// const errorCases = (label, data) => {
// 	let error;
// 	switch (label) {
// 		case "name":
// 			error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
// 				data.length < 2 ? 'Name is too short' :
// 					data.length > 16 ? "Name is too long" : '';
// 			break;
// 		case "surname":
// 			error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
// 				data.length < 2 ? 'Surname is too short' :
// 					data.length > 16 ? "Surname is too long" : '';
// 			break;
// 		case "email":
// 			error = !data.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i) ? 'Invalid email' : '';
// 			break;
// 		default:
// 			break;
// 	}
// 	return error;
// }
// const helperText = (label) => {
// 	let text = '';
// 	switch (label) {
// 		case 'id':
// 			text = 'Unique id';
// 			break;
// 		case 'name':
// 			text = 'First name';
// 			break;
// 		case 'surname':
// 			text = 'Second name';
// 			break;
// 		case 'email':
// 			text = 'Unique email';
// 			break;
// 		default:
// 			break;
// 	}
// 	return text;
// }

// Masters
// const errorCases = (label, data) => {
// 	let error;
// 	switch (label) {
// 		case "name":
// 			error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
// 				data.length < 2 ? 'Name is too short' :
// 					data.length > 16 ? "Name is too long" : '';
// 			break;
// 		case "surname":
// 			error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
// 				data.length < 2 ? 'Surname is too short' :
// 					data.length > 16 ? "Surname is too long" : '';
// 			break;
// 		case "rating":
// 			error = !data.match(/^[1-5]$/) ? '1 to 5 only' : '';
// 			break;
// 		default:
// 			break;
// 	}
// 	return error;
// }
// const helperText = (label) => {
// 	let text = '';
// 	switch (label) {
// 		case 'id':
// 			text = 'Unique id';
// 			break;
// 		case 'city':
// 			text = 'Select city';
// 			break;
// 		case 'name':
// 			text = 'First name';
// 			break;
// 		case 'surname':
// 			text = 'Second name';
// 			break;
// 		case 'rating':
// 			text = 'rate 1 to 5';
// 			break;
// 		default:
// 			break;
// 	}
// 	return text;
// }

// Orders
// const errorCases = (label, data) => {
// 	let error = '';
// 	switch (label) {
//
// 		default:
// 			break;
// 	}
// 	return error;
// }
// const helperText = (label) => {
// 	let text = '';
// 	switch (label) {
// 		case 'id':
// 			text = 'Unique id';
// 			break;
// 		case 'master':
// 			text = 'First select a master';
// 			break;
// 		case 'city':
// 			text = 'City of master';
// 			break;
// 		case 'customer':
// 			text = 'Customers name';
// 			break;
// 		case 'service':
// 			text = 'Service name';
// 			break;
// 		case 'date':
// 			text = 'Choose a date';
// 			break;
// 		default:
// 			break;
// 	}
// 	return text;
// }
