import React, {useEffect, useState} from 'react';
import AdmTable from "../Table/admin-table";
import AdminTableHeaderEditing from "../Table/Table-Head/admin-table-header-editing";
import AdminTableHeader from "../Table/Table-Head/admin-table-header";


const Services = (props) => {
	const [state, setState] = useState(null);
	const [dataToChange, setDataToChange] = useState({});
	const [columns, setColumns] = useState([]);
	const [items, setItems] = useState([]);
	const [changes, setChanges] = useState(0);

	const {getItems, deleteItem, updateItem, addItem, getColumnNames} = props
	const subj = 'services'

	useEffect(() => {
		getItems(subj).then(data => setItems(data));
		getColumnNames(subj).then(data => setColumns(data));
		console.log('renew')
	}, [changes])


	//push item from table list to head for editing
	const pushItemToEdit = (data) => {
		setDataToChange({...data});
		setState('isEditing');
	}

	//create fields here for the new item. No id because it was created in the database.
	const pushDataToCreate = () => {
		const res = [...columns].filter(key => key !== 'id');
		const data = res.reduce((acc, key) => {
			return {...acc, [key]: ''}
		}, {})
		setDataToChange(data);
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
		<>
			<AdmTable items={items} del={deleteSelectedItem} pushItemToEdit={pushItemToEdit}
								state={state}>
				{state ?
					<AdminTableHeaderEditing cancel={cancelInput} data={dataToChange} state={state}
																	 update={updateSelectedItem}
																	 edit={handleChangeData} add={addNewItem}/> :
					<AdminTableHeader columns={columns} create={pushDataToCreate}/>}
			</AdmTable>
		</>
	)
}

export default Services