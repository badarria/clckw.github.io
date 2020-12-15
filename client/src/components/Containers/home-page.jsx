import React from 'react'
import {Container} from '@material-ui/core'
import '../../App.css'
import MainSearchForm from "./HomePage/search-form";
import {MastersList} from "../Common/masters-list"
import {getFreeMastersState} from "../../middleware/state-selectors";
import {acceptOrder} from "../../middleware/thunks";
import {compose} from "redux";
import {connect} from "react-redux";


const HomePage = ({mastersList, accept}) => {

	return (
		<Container>
			<h1 style={{textAlign: 'center', padding: '32px 0 0'}}>Find master</h1>
			<MainSearchForm/>
			{mastersList.length ?
				<MastersList data={mastersList} accept={accept}/> : null}
		</Container>
	)
}


const mapStateToProps = (state) => {
	return ({
		mastersList: getFreeMastersState(state)
	})
}
const mapDispatchToProps = (dispatch) => {
	return ({
		accept: (master_id) => dispatch((acceptOrder(master_id))),
	})
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(HomePage);


