import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Container, AppBar, Toolbar,} from "@material-ui/core"
import {LoginForm} from './login-form'
import {compose} from "redux";
import {connect} from "react-redux";
import {getAuthState} from "../../../middleware/state-selectors";
import {login, logout} from "../../../middleware/home/home-page-thunks";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles({
	root: {
		spaceBetween: 'justifyContent',
	},
	title: {
		textDecoration: "none",
		color: "white",
		fontSize: '16px',
	},
	buttons: {
		display: 'flex',
		flexGrow: '1',
		justifyContent: 'flex-end'
	}
})

const Navigation = ({ logout, login, isAuth}) => {
	const classes = useStyles();


	const formProps = {login, isAuth}

	return (
		<AppBar position="static">
			<Container>
				<Toolbar className={classes.root}>
					<Button component={Link} to={"/"} className={classes.title}>
						Clockware
					</Button>
					<Box className={classes.buttons}>
						{isAuth ?
							<Button color="inherit" component={Link} to={"/admin"}>Admin</Button> : null}
						{isAuth ?
							<Button color="inherit" onClick={logout}>Logout</Button> :
							<LoginForm {...formProps} />}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuth: getAuthState(state),
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout),
		login: (data) => dispatch(login(data)),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(Navigation);