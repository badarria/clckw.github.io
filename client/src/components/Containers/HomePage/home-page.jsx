import React from 'react'
import {Container, Typography, Paper, Box} from '@material-ui/core'
import MainSearchForm from "./search-form";
import {MastersList} from "../../Common/masters-list"
import {
	getFreeMastersState, getMessageState,
	getToastMsgState, getLoadingState
} from "../../../middleware/state-selectors";
import {acceptOrder} from "../../../middleware/home/home-page-thunks";
import {compose} from "redux";
import {connect} from "react-redux";
import {Toast} from "../../Common/toast";
import {Loader} from "../../Common/loader";
import {useHomeStyle} from "../../styles/styles";


const HomePage = ({mastersList, accept, msg, toast, loading}) => {
	const classes = useHomeStyle()

	return (
		<Container className={classes.container}>
			<Box className={classes.wrap}>
				<Loader loading={loading}/>
				<Typography variant="h3" component="h3" className={classes.title}>Find master</Typography>
				<MainSearchForm/>
				{msg ?
					<Paper className={classes.msgBox}>
						<Typography variant="h5" component="h4">{msg}</Typography>
					</Paper> : null}
				{mastersList.length ?
					<MastersList data={mastersList} accept={accept}/> : null}
				<Toast toast={toast}/>
			</Box>
		</Container>
	)
}


const mapStateToProps = (state) => ({
	mastersList: getFreeMastersState(state),
	msg: getMessageState(state),
	toast: getToastMsgState('home', state),
	loading: getLoadingState('home', state),
})

const mapDispatchToProps = (dispatch) => {
	return ({
		accept: (master_id) => dispatch(acceptOrder(master_id)),
	})
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(HomePage);


