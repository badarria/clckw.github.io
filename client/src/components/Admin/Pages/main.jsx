import React from 'react';
import {Box, Container} from '@material-ui/core';
import AdminTabs from "../admin-tabs";
import Customers from './customers';
import Cities from './cities';
import Masters from './masters';
import Services from "./services";
import Orders from "./orders";


const Main = () => {

	return (
		<Container>
			<Box mt={3}>
				<AdminTabs labels={["customers", "masters", "cities", "services", 'orders']}>
					<Customers />
					<Masters />
					<Cities/>
					<Services/>
					<Orders/>
				</AdminTabs>
			</Box>
		</Container>
	);
}

export default Main;