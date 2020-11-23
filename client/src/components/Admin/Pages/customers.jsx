import React from 'react';
import TableWrapper from "../table-wrapper";

const Customers = () => {
	const subj = 'customers'

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
			case "email":
				error = !data.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i) ? 'Invalid email' : '';
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
			case 'name':
				text = 'First name';
				break;
			case 'surname':
				text = 'Second name';
				break;
			case 'email':
				text = 'Unique email';
				break;
			default:
				break;
		}
		return text;
	}



	return (
		<>
			<TableWrapper subj={subj} errorCases={errorCases} helperText={helperText}/>
		</>
	)
}

export default Customers