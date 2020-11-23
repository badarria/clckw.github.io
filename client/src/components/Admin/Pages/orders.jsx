import React from 'react';
import TableWrapper from "../table-wrapper";

const Orders = () => {
	const subj = 'orders'

	const errorCases = (label, data) => {
		let error = '';
		switch (label) {

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
			case 'master':
				text = 'First select a master';
				break;
			case 'city':
				text = 'City of master';
				break;
			case 'customer':
				text = 'Customers name';
				break;
			case 'service':
				text = 'Service name';
				break;
			case 'date':
				text = 'Choose a date';
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

export default Orders