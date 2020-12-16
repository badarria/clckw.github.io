const adminPath = '/admin'
const mainPagePath = '/main-page'

export const getItems = async (subj) => {
	try {
		const response = await fetch(`${adminPath}/${subj}`);
		return response.json();
	} catch (err) {
		console.error(err.message);
	}
}

export const removeItem = async (id, subj) => {
	try {
		await fetch(`${adminPath}/${subj}/${id}`, {
			method: "DELETE"
		});
	} catch (err) {
		console.error(err)
	}
}

export const updateItem = async (data, subj) => {
	try {
		const body = data;
		const id = data.id;
		const edit = await fetch(`${adminPath}/${subj}/${id}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		})
		return edit.json()
	} catch (err) {
		console.error(err)
	}
}

export const addItem = async (data, subj) => {
	try {
		const body = data;
		const res = await fetch(`${adminPath}/${subj}`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(body)
		})
		return res.json()
	} catch (err) {
		console.error(err)
	}
}


export const getForeignKeys = async (subj) => {
	try {
		const res = await fetch(`${adminPath}/${subj}/foreignKeys`);
		return res.json()
	} catch (err) {
		console.error(err.message)
	}
}

export const getFilteredOrders = async (subj, master_id, date, order_id) => {
	try {
		console.log(date, 'filteredOrders')
		const res = await fetch(`${adminPath}/${subj}/filtered/${date}/${master_id}/${order_id}`)
		return res.json()
	} catch (err) {
		console.error(err.message)
	}
}

////////HomePage

export const getFreeMasters = async (city, begin, end) => {
	try {
		const res = await fetch(`${mainPagePath}/find/${city}/${begin}/${end}`)
		return res.json()
	} catch (err) {
		console.error(err.message)
	}
}
export const getCustomer = async (email) => {
	try {
		const res = await fetch(`${mainPagePath}/customer/${email}`)
		return res.json()
	} catch (err) {
		console.error(err.message)
	}
}


export const loginUser = async (data) => {
	try {
		const res = await fetch('/auth', {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		})
		return res.json()
	} catch (err) {
		console.error(err.message);
	}
}

export const stayAuth = async () => {
	try {
		const res = await fetch('/auth/verify', {
			method: "GET",
			headers: {token: localStorage.token}
		});
		return res.json();
	} catch (err) {
		console.error(err.message)
	}
}
