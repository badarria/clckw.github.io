import React, {useEffect, useState} from 'react';
import AdmTable from "./Table/admin-table";
import AdminTableHeaderEditing from "./Table/Table-Head/admin-table-header-editing";
import AdminTableHeader from "./Table/Table-Head/admin-table-header";
import {getColumnNames, addItem, updateItem, deleteItem, getItems} from './requests'


const TableWrapper = (props) => {
	const [state, setState] = useState(null);
	const [dataToChange, setDataToChange] = useState({});
	const [columns, setColumns] = useState([]);
	const [items, setItems] = useState([]);
	const [changes, setChanges] = useState(0);
	const [foreignKeys, setForeignKeys] = useState({})

	const {subj} = props

	useEffect(() => {
		getItems(subj).then(data => setItems(data));
		getColumnNames(subj).then(data => setColumns(data));
		getItems(`${subj}/foreignKeys`).then(data => setForeignKeys(data || {}))
	}, [changes])


	const mergeWithForeignKeys = (data) => {
		const res = data.reduce((acc, [key, value]) => {
				if (foreignKeys[key]) {
					const idToEdit = data.reduce((acc, [name, val]) => {
						if (name === `${key}_id`) acc = val;
						return acc;
					}, 0);

					const filteredKeys = foreignKeys[key].filter(({id}) => id !== idToEdit)
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

	const pushItemToEdit = (data) => {
		const res = mergeWithForeignKeys(Object.entries(data))
		setDataToChange(res)
		setState('isEditing');
	}

	const pushDataToCreate = () => {
		const res = mergeWithForeignKeys([...columns].reduce((acc, column) => {
			if (column !== 'id') acc.push([column, ''])
			return acc;
		}, []));
		setDataToChange(res);
		setState('isAdding')
	}

	const handleChangeData = (key, value) => {
		setDataToChange({...dataToChange, [key]: value})
	}

	const cancelInput = () => {
		setState(null);
		setDataToChange({});
	}

////////
	const addNewItem = () => {
		///isValid?
		addItem(dataToChange, subj)
			.then(cancelInput())
			.then(setChanges(changes => ++changes))
	}

	const updateSelectedItem = () => {
		///isValid?
		updateItem(dataToChange, subj)
			.then(cancelInput())
			.then(setChanges(changes => ++changes))
	}

	const deleteSelectedItem = (id) => {
		deleteItem(id, subj)
			.then(cancelInput())
			.then(setChanges(changes => ++changes))
	}


	return (
		<AdmTable items={items} columns={columns} del={deleteSelectedItem} pushItemToEdit={pushItemToEdit}
							state={state}>
			{state ?
				<AdminTableHeaderEditing cancel={cancelInput} data={dataToChange} state={state}
																 update={updateSelectedItem}
																 edit={handleChangeData} add={addNewItem}/> :
				<AdminTableHeader columns={columns} create={pushDataToCreate}/>}
		</AdmTable>
	)
}

export default TableWrapper