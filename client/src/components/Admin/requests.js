const path = '/admin'

const getItems = async (subj) => {
	try {
		const response = await fetch(`${path}/${subj}`);
		const jsonData = await response.json();
		return jsonData;
		// setItems({[subj]: jsonData});
	} catch (err) {
		console.error(err.message);
	}
}

const deleteItem = async (id, subj) => {
	try {
		await fetch(`${path}/${subj}/${id}`, {
			method: "DELETE"
		});
	} catch (err) {
		console.error(err)
	}
}

const updateItem = async (data, subj) => {
	try {
		const body = data;
		const id = data.id;
		const edit = await fetch(`${path}/${subj}/${id}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		})
	} catch (err) {
		console.error(err)
	}
}

const addItem = async (data, subj) => {
	try {
		const body = data;
		const res = await fetch(`${path}/${subj}`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		})
	} catch (err) {
		console.error(err)
	}
}

const getColumnNames = async (subj) => {
	try {
		const res = await fetch(`${path}/${subj}/columnNames`);
		const req = await res.json();
		const names = await req.map(({column_name}) => column_name.replace(/\Bid|\Bat$/i, '')).filter(name => !name.match(/_/));
		return names;
	} catch (err) {
		console.error(err.message)
	}
};

export {getColumnNames, addItem, updateItem, deleteItem, getItems}