export const mergeWithForeignKeys = (data, keys) => {
	const res = data.reduce((acc, [key, value]) => {
			if (keys[key]) {
				const idToEdit = data.reduce((acc, [name, val]) => {
					if (name === `${key}_id`) acc = val;
					return acc;
				}, 0);

				const filteredKeys = keys[key].filter(({id}) => id !== idToEdit)
				acc = {
					...acc,
					[key]: [{
						'id': idToEdit,
						'name': value || ''
					}, ...filteredKeys]
				}
			} else if (!key.match(/_id/)) {
				acc = {...acc, [key]: value || ''}
			}
			return acc;
		}, {}
	)
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