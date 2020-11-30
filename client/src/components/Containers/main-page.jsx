import React, {useState} from 'react'
import {Container} from '@material-ui/core'
import '../../App.css'
import {useDispatch, useSelector} from 'react-redux'
import SearchForm from "../Common/search-form";


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
const MainPage = () => {
	const [state, setState] = useState(init);
	const dispatch = useDispatch();


	return (
		<Container>
			<h1>Main page</h1>
			{/*<SearchForm const find={find} handleChange={handleChange} state={state.find} clear={clear}/>*/}
		</Container>
	)
}

export default MainPage;