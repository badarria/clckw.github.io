import React from 'react';
import {Box, Container} from '@material-ui/core';
import HorizontalTabs from "../Common/horizontal-tabs";
import Customers from './customers-container';
import Cities from './cities-container';
import Masters from './masters-container';
import ServicesContainer from "./services-container";
import OrdersContainer from "./orders-container";


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