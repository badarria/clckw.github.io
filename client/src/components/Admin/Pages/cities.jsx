import React from 'react';
import TableWrapper from "../table-wrapper";

const Cities = () => {
	const subj = 'cities'

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
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
				text = 'Unique city name';
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

export default Cities