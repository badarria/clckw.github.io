import React, {useEffect, useState} from 'react';
import AdmTable from "./Table/admin-table";
import AdminTableHeaderEditing from "./Table/Table-Head/admin-table-header-editing";
import AdminTableHeader from "./Table/Table-Head/admin-table-header";
import {getColumnNames, addItem, updateItem, deleteItem, getItems} from './requests'
import AdminTableHeaderOrders from "./Table/Table-Head/admin-table-header-orders";


const TableWrapper = (props) => {
	const [changes, setChanges] = useState(0);
	const [globalState, setGlobalState] = useState({items: [], columns: []})

	const {subj, helperText = {}, errorCases = {}} = props
	const {state, dataToChange, errors, columns, foreignKeys} = globalState;

	useEffect(() => {
		const getData = async () => {
			const items = await getItems(subj)
			const columns = await getColumnNames(subj)
			const keys = await getItems(`${subj}/foreignKeys`)
			return {items, columns, keys}
		}
		getData().then(({items, columns, keys}) => setGlobalState((globalState) => ({
			...globalState,
			'items': items,
			'columns': columns,
			'foreignKeys': keys || {}
		})))
	}, []);

	useEffect(() => {
		getItems(subj).then((items) => setGlobalState((globalState) => ({...globalState, 'items': items})))
	}, [changes]);


	console.log(globalState)

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

	const getHelperText = (data) => {
		return data.reduce((acc, [key]) => {
			acc = {...acc, [key]: helperText(key)}
			return acc;
		}, {})
	}

	const pushItemToEdit = (data) => {
		const res = mergeWithForeignKeys(Object.entries(data))
		const text = getHelperText(Object.entries(data))
		setGlobalState({...globalState, dataToChange: res, errors: {}, helper: text, state: 'isEditing'});
	}

	const pushDataToCreate = () => {
		const res = mergeWithForeignKeys([...columns].reduce((acc, column) => {
			if (column !== 'id') acc.push([column, ''])
			return acc;
		}, []));
		const text = getHelperText(Object.entries(res))
		setGlobalState({...globalState, dataToChange: res, errors: {}, helper: text, state: 'isAdding'});
	}

	const handleChangeData = (key, value) => {
		setGlobalState({
			...globalState,
			dataToChange: {...dataToChange, [key]: value},
			errors: {
				...errors, [key]: errorCases(key, value)
			},
		})
	}

	const cancelInput = () => {
		setGlobalState({
			...globalState,
			dataToChange: {},
			state: null,
		})
	}

////////
	const normalize = (data) => {
		return Object.entries(data).reduce((acc, [key, value]) => {
			if (!Array.isArray(value)) acc = {...acc, [key]: value};
			return acc;
		}, {})
	}

// const validation = (data) => {
// 	return false
// }

	const pushToDB = () => {
		///isValid?
		const normData = normalize(dataToChange);
		const func = state === 'isAdding' ? addItem : updateItem;
		func(normData, subj)
			.then(cancelInput())
			.then(setChanges(changes => ++changes))
	}

	const deleteSelectedItem = (id) => {
		deleteItem(id, subj)
			.then(cancelInput())
			.then(setChanges(changes => ++changes))
	}


	return (
		<>
			<AdmTable data={globalState} del={deleteSelectedItem} pushItemToEdit={pushItemToEdit}>
				{state ? subj === 'orders' ?
					<AdminTableHeaderOrders cancel={cancelInput} push={pushToDB} edit={handleChangeData} data={globalState}/> :
					<AdminTableHeaderEditing cancel={cancelInput} data={globalState}
																	 push={pushToDB}
																	 edit={handleChangeData}/> :
					<AdminTableHeader columns={columns} create={pushDataToCreate}/>}
			</AdmTable>
		</>
	)
}

export default TableWrapper