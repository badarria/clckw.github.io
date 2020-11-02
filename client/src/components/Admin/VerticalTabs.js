import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, Tabs, Tab, Typography, Box} from '@material-ui/core';
import ItemsTable from "./ItemsTable";


function TabPanel(props) {
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

function a11yProps(index) {
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

function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root} mt={10}>
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

			</Tabs>
			<TabPanel value={value} index={0}>
				<ItemsTable subj='customers'/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				Masters
			</TabPanel>
			<TabPanel value={value} index={2}>
				Cities
			</TabPanel>
			<TabPanel value={value} index={3}>
				Orders
			</TabPanel>
		</div>
	);
}

export default VerticalTabs;