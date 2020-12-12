export const emptyFields = (columns) => {
	return columns.reduce((acc, column) => {
		if (column !== 'id') acc[column] = ''
		return acc;
	}, {})
}

export const mergeWithForeignKeys = (data, keys, isEditing = true) => {
	const res = data.reduce((acc, [key, value]) => {
		if (keys[key]) {
			if (isEditing) {
				const idToEdit = data.reduce((acc, [name, val]) => {
					if (name === `${key}_id`) acc = val;
					return acc;
				}, 0);
				const editedObj = keys[key].find(({id}) => id === idToEdit);
				const filteredKeys = keys[key].filter(({id}) => id !== idToEdit);
				acc = {...acc, [key]: [editedObj, ...filteredKeys]}
			} else {
				const paramKeys = Object.keys(keys[key][0]);
				const newEmptyObj = paramKeys.reduce((acc, param) => {
					acc = {...acc, [param]: '',}
					return acc
				}, {})
				acc = {...acc, [key]: [newEmptyObj, ...keys[key]]}
			}
		} else if (!key.match(/_/)) {
			acc = {...acc, [key]: value || ''}
		}
		return acc;
	}, {})
	return res
}

export const getHelperText = (data, textObj) => {
	return data.reduce((acc, [key]) => {
		acc = {...acc, [key]: textObj(key)}
		return acc;
	}, {})
}

export const normalize = (data) => {
	return Object.entries(data).reduce((acc, [key, value]) => {
		if (!Array.isArray(value)) acc = {...acc, [key]: value};
		return acc;
	}, {})
}