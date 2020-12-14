import React from 'react';
import {Box, Container} from '@material-ui/core';
import HorizontalTabs from "../Common/horizontal-tabs";
import Customers from './Admin/Customers/customers-container';
import Cities from './Admin/Cities/cities-container';
import Masters from './Admin/Masters/masters-container';
import ServicesContainer from "./Admin/Services/services-container";
import OrdersContainer from "./Admin/Orders/orders-container";


const AdminPage = () => {
	return (
		<Container>
			<Box mt={3}>
				<HorizontalTabs labels={["customers", "masters", "cities", "services", 'orders']}>
					<Customers />
					<Masters />
					<Cities/>
					<ServicesContainer/>
					<OrdersContainer/>
				</HorizontalTabs>
			</Box>
		</Container>
	);
}

export default AdminPage;