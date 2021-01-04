const _findEditedId = (data, key) => {
  return data.reduce((acc, [name, val]) => {
    if (name === `${key}_id`) acc = val;
    return acc;
  }, 0);
};

const _findEditedObj = (data, editedId) =>
  data.find(({ id }) => id === editedId);

const _filterData = (data, editedId) =>
  data.filter(({ id }) => id !== editedId);

const _createNewEmptyObj = (source) => {
  const paramKeys = Object.keys(source);
  return paramKeys.reduce((acc, param) => {
    acc = { ...acc, [param]: "" };
    return acc;
  }, {});
};

export const mergeWithForeignKeys = (data, keys) => {
  const res = data.reduce((acc, [key, value]) => {
    if (keys[key]) {
      const idToEdit = _findEditedId(data, key);
      const filteredKeys = _filterData(keys[key], idToEdit);
      const editedObj = idToEdit
        ? _findEditedObj(keys[key], idToEdit)
        : _createNewEmptyObj(keys[key][0]);
      acc = { ...acc, [key]: [editedObj, ...filteredKeys] };
    } else if (!key.match(/_/)) {
      acc = { ...acc, [key]: value || "" };
    }
    return acc;
  }, {});
  return res;
};

export const emptyFields = (columns) => {
  return columns.reduce((acc, column) => {
    if (column !== "id") acc[column] = "";
    return acc;
  }, {});
};

export const getServiceTime = () => {
  let res = [];
  for (let i = 1; i < 9; i += 1) {
    res.push({ id: i, name: `${i}h` });
  }
  return res;
};
