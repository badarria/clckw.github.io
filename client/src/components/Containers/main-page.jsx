import React from 'react'
import {Container} from '@material-ui/core'
import '../../App.css'
import {getInitState} from "../../middleware/thunks";
import {compose} from "redux";
import {connect} from "react-redux";
import MainSearchForm from "../Common/form/search-form";


const {useEffect} = require("react");


const MainPage = (props) => {
	const {initState} = props




	return (
		<Container>
			<h1>Find your master</h1>
			<MainSearchForm />
		</Container>
	)
}


const mapDispatchToProps = (dispatch, getState) => {
	return {
		initState: () => dispatch(getInitState)
	}
}

export default compose(
	connect(null, mapDispatchToProps))
(MainPage);