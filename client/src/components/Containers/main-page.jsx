import React, {useState} from 'react'
import {Container} from '@material-ui/core'
import '../../App.css'
import {getInitState} from "../../middleware/thunks";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {getAuth, getFormData} from "../../middleware/state-selectors";

const {useEffect} = require("react");


const MainPage = (props) => {
	const {initState, fields, auth} = props


	useEffect(() => {
		initState()
	}, [])

	return (
		<Container>
			<h1>Find your master</h1>
			{/*<SearchForm const find={find} handleChange={handleChange} state={state.find} clear={clear}/>*/}
		</Container>
	)
}



const mapStateToProps = (state) => ({
	fields: getFormData(state),
})
const mapDispatchToProps = (dispatch, getState) => {
	return {
		initState: () => dispatch(getInitState)
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))
(MainPage);