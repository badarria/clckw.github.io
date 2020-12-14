import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Container, AppBar, Toolbar, Typography, Button, makeStyles} from "@material-ui/core"
import {LoginForm} from './login-form'
import {compose} from "redux";
import {connect} from "react-redux";
import {getAuthState} from "../../../middleware/state-selectors";
import {checkAuth, login, logout} from "../../../middleware/thunks";


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Navigation = ({checkAuth, logout, login, isAuth}) => {
	const classes = useStyles();

	useEffect(() => {
		checkAuth()
	}, [])

	const formProps = {login, classes: classes.menuButton}

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Typography component={Link} to={"/"} style={{textDecoration: "none", color: "white"}} variant="h6"
											className={classes.title}>
						Clockware
					</Typography>
					{isAuth ?
						<Button color="inherit" component={Link} to={"/admin"} className={classes.menuButton}>Admin</Button> : null}
					{isAuth ? <Button color="inherit" onClick={logout} className={classes.menuButton}>Logout</Button> :
						<LoginForm {...formProps} />}
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
		checkAuth: () => dispatch(checkAuth),
		logout: () => dispatch(logout),
		login: (data) => dispatch(login(data)),
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(Navigation);