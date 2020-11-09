import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, Tabs, Tab, Typography, Box, Container} from '@material-ui/core';
import AdminTable from "./admin-table";
// import {Context} from "./components/context";


const TabPanel = (props) => {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 224,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));

const AdminMain = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container>
			<Box className={classes.root} mt={10}>
				<Tabs
					orientation="vertical"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					className={classes.tabs}
				>
					<Tab label="Customers" {...a11yProps(0)} />
					<Tab label="Masters" {...a11yProps(1)} />
					<Tab label="Cities" {...a11yProps(2)} />
					<Tab label="Orders" {...a11yProps(3)} />
					<Tab label="Services" {...a11yProps(4)} />

				</Tabs>
				<TabPanel value={value} index={0}>
					<AdminTable subj='customers'/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AdminTable subj='masters'/>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<AdminTable subj='cities'/>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<AdminTable subj='orders'/>
				</TabPanel>
				<TabPanel value={value} index={4}>
					<AdminTable subj='services'/>
				</TabPanel>
			</Box>
		</Container>
	);
}

export default AdminMain;