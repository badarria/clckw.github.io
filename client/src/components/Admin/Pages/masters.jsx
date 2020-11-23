import React from 'react';
import TableWrapper from "../table-wrapper";


const Masters = () => {
	const subj = 'masters'

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
			case "surname":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Surname is too short' :
						data.length > 16 ? "Surname is too long" : '';
				break;
			case "rating":
				error = !data.match(/^[1-5]$/) ? '1 to 5 only' : '';
				break;
			default:
				break;
		}
		return error;
	}

	const helperText = (label) => {
		let text = '';
		switch (label) {
			case 'id':
				text = 'Unique id';
				break;
			case 'city':
				text = 'Select city';
				break;
			case 'name':
				text = 'First name';
				break;
			case 'surname':
				text = 'Second name';
				break;
			case 'rating':
				text = 'rate 1 to 5';
				break;
			default:
				break;
		}
		return text;
	}


	return (
		<TableWrapper subj={subj} errorCases={errorCases} helperText={helperText}/>
	)
}

export default Masters