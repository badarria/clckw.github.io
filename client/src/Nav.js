import React from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import {Container, AppBar, Toolbar, Typography, Button, makeStyles} from "@material-ui/core"

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

function Nav() {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Clockware
					</Typography>
						<Button color="inherit" component={Link} to={"/"} className={classes.menuButton}>Home</Button>
						<Button color="inherit" component={Link} to={"/admin"}>Admin</Button>
				</Toolbar>
			</Container>
		</AppBar>

	)
}

export default Nav;