import React from 'react';
import {Box, Container} from '@material-ui/core';
import HorizontalTabs from "../../Common/horizontal-tabs";
import Customers from './Customers/customers-container';
import Cities from './Cities/cities-container';
import Masters from './Masters/masters-container';
import ServicesContainer from "./Services/services-container";
import OrdersContainer from "./Orders/orders-container";


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