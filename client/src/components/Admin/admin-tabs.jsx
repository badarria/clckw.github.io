import {Box, makeStyles, Tab, Tabs} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";



const TabPanel = (props) => {
	const {children, value, index, ...other} = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
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
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const AdminTabs = (props) => {
	const classes = useStyles;
	const [value, setValue] = React.useState(0);
	const {children, labels} = props;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
				className={classes.root}
			>
				{labels.map((label, inx) => {
					return (
						<Tab label={label} {...a11yProps(inx)} />
					)
				})}
			</Tabs>

			{children.map((item, inx) => {
				return (
					<TabPanel value={value} index={inx}>
						{item}
					</TabPanel>
				)
			})}
		</>
	);
}

export default AdminTabs;

AdminTabs.propTypes = {
	children: PropTypes.node,
	labels: PropTypes.array.isRequired,
}