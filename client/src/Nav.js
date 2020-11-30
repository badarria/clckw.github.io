import React from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import {Container, AppBar, Toolbar, Typography, Button, makeStyles} from "@material-ui/core"
import Login from './components/Common/Login'


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

const Nav = (props) => {
	const classes = useStyles();
	const {loginUser, isAuth, logout} = props;

	return (
				<AppBar position="static">
			<Container>
				<Toolbar>
					<Typography component={Link} to={"/"} style={{textDecoration: "none", color:"white"}} variant="h6" className={classes.title}>
						Clockware
					</Typography>
					{isAuth ? <Button color="inherit" component={Link} to={"/admin"} className={classes.menuButton}>Admin</Button> : null}
					{isAuth ? <Button color="inherit" onClick={logout} className={classes.menuButton}>Logout</Button> :
						<Login loginUser={loginUser} classes={classes.menuButton}/>}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Nav;