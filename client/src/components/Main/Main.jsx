import React, {useEffect, useState} from 'react'
import {Box, Button, Container} from '@material-ui/core'
import '../../App.css'
import {useDispatch, useSelector} from 'react-redux'
import SearchForm from "./search-form";
import {getItemsThunkCreator} from '../../middleware/thunks'
// import {addCitiesList} from '../../slices/root-reduser'
import {actions}  from '../../slices/root-reduser'

const init = {
	find: {
		city: null,
		date: null,
		service: null,
		time: null,
	},
	customerData: {
		name: '',
		surname: '',
		email: ''
	},
	orderData: {
		masterId: null,
		cityId: null,
		serviceId: null,
		customerId: null,
		startAt: null,
		endAt: null
	}
}
const Main = () => {
	const [state, setState] = useState(init);
	const dispatch = useDispatch();
	// const data = useSelector(state => state.main.dataToSearch)


	const find = (e) => {
		e.preventDefault()
		// addCitiesList('cities')
		getItemsThunkCreator('cities')(dispatch);
		// addCitiesList(['d', 'dd', 'ddd'])
	}

	const clear = () => {
		setState(init)
	}
	const handleChange = (key, value) => {
		console.log(key, value)
		setState({...state, find: {...state.find, [key]: value}})
		console.log(state.find)
	}

	const subj = 'services'

	const click = () => {
		const func = (name) => actions[name][`test${name}`]
		dispatch(func(subj)())
		console.log(actions[subj][`test${subj}`])
	}

	return (
		<Container>
			<Button onClick={click}>Click</Button>
			<SearchForm const find={find} handleChange={handleChange} state={state.find} clear={clear}/>
		</Container>
	)
}

export default Main;