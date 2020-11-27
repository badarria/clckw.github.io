import React, {useState} from 'react'
import {Container} from '@material-ui/core'
import '../../App.css'
import SearchForm from "./search-form";

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

	const find = (e) => {
		e.preventDefault()
	}
	const clear = () => {
		setState(init)
	}
	const handleChange = (key, value) => {
		console.log(key, value)
		setState({...state, find: {...state.find, [key]: value} })
		console.log(state.find)
	}

	return (
		<Container>
			<SearchForm const find={find} handleChange={handleChange} state={state.find} clear={clear}/>
		</Container>
	)
}

export default Main;