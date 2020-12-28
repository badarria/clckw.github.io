const adminPath = '/admin'

const _wrapTryCatch = async (tryFunc) => {
	try {
		return await tryFunc
	} catch {
		return {type: 'error', msg: 'Something went wrong'}
	}
}

const _changeEventErr = async (changeFunc) => {
	const msg = await changeFunc
	if (msg === 'error') {
		return {type: 'error', msg: 'Something went wrong'}
	} else return {type: 'success', msg}
}

const _update = async (data, subj) => {
	const id = data.id;
	const res = await fetch(`${adminPath}/${subj}/${id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(data)
	})
	return res.json();
}

const _remove = async (id, subj) => {
	const res = await fetch(`${adminPath}/${subj}/${id}`, {
		method: "DELETE"
	});
	return res.json()
}

const _add = async (data, subj) => {
	const res = await fetch(`${adminPath}/${subj}`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(data)
	})
	return res.json()
}

const _get = async (subj) => {
	const response = await fetch(`${adminPath}/${subj}`);
	return response.json();
}

const _getKeys = async (subj) => {
	const res = await fetch(`${adminPath}/${subj}/foreignKeys`);
	return res.json()
}
const _getFilteredOrd = async ({master_id, order_id, date}, subj) => {
	const res = await fetch(`${adminPath}/${subj}/filtered/${date}/${master_id}/${order_id}`)
	return res.json()
}

export const updateItem = async (data, subj) => _wrapTryCatch(_changeEventErr(_update(data, subj)))
export const removeItem = async (data, subj) => _wrapTryCatch(_changeEventErr(_remove(data, subj)))
export const addItem = async (data, subj) => _wrapTryCatch(_changeEventErr(_add(data, subj)))
export const getItems = async (subj) => _wrapTryCatch(_get(subj))
export const getForeignKeys = async (subj) => _wrapTryCatch(_getKeys(subj))
export const getFilteredOrders = async (data, subj) => _wrapTryCatch(_getFilteredOrd(data, subj))