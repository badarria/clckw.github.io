import React from 'react';
import TableWrapper from "../table-wrapper";

const Services = () => {
	const subj = 'services'

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0 -9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
			case "time":
				error = !data.match(/^\d+$/) ? 'Only digits' : !data.match(/^[1-7]$/) ? 'from 1 to 7 hours' : '';
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
				text = 'Unique service name';
				break;
			case 'time':
				text = 'Duration, hours';
				break;
			default:
				break;
		}
		return text;
	}


	return (
		<>
			<TableWrapper subj={subj} helperText={helperText} errorCases={errorCases}/>
		</>
	)
}

export default Services