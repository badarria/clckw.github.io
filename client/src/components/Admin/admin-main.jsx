import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, Box, Container} from '@material-ui/core';
import AdminTable from "./admin-table";
import AdminTabs from "./admin-tabs";


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const AdminMain = () => {
	const classes = useStyles();

	return (
		<Container>
			<Box className={classes.root} mt={3}>
				<AdminTabs labels={["customers", "masters", "cities", "services", "orders"]}>
					<AdminTable subj='customers'/>
					<AdminTable subj='masters'/>
					<AdminTable subj='cities'/>
					<AdminTable subj='services'/>
					<AdminTable subj='orders'/>
				</AdminTabs>
			</Box>
		</Container>
	);
}

export default AdminMain;