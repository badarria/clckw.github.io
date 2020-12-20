import React from 'react'
import {Container, Typography, Paper} from '@material-ui/core'
import MainSearchForm from "./search-form";
import {MastersList} from "../../Common/masters-list"
import {
	getFreeMastersState, getMessageState,
	getToastMsgState, getLoadingState
} from "../../../middleware/state-selectors";
import {acceptOrder} from "../../../middleware/home-page-thunks";
import {compose} from "redux";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Toast} from "../../Common/toast";
import {Loader} from "../../Common/loader";


export const useStyle = makeStyles({
	msgBox: {width: '70%', margin: '0 auto', padding: '24px'},
	title: {textAlign: 'center', margin: '50px 0 0'}
})

const HomePage = ({mastersList, accept, msg, toastMsg, loading}) => {
	const classes = useStyle()

	return (
		<Container>
			<Loader loading={loading}/>
			<Typography variant="h3" component="h3" className={classes.title}>Find master</Typography>
			<MainSearchForm/>
			{msg ?
				<Paper className={classes.msgBox}>
					<Typography variant="h5" component="h4">{msg}</Typography>
				</Paper> : null}
			{mastersList.length ?
					<MastersList data={mastersList} accept={accept}/> : null}
			<Toast msg={toastMsg}/>
		</Container>
	)
}


const mapStateToProps = (state) => ({
	mastersList: getFreeMastersState(state),
	msg: getMessageState(state),
	toastMsg: getToastMsgState('main', state),
	loading: getLoadingState('main', state),
})

const mapDispatchToProps = (dispatch) => {
	return ({
		accept: (master_id) => dispatch(acceptOrder(master_id)),
	})
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(HomePage);


