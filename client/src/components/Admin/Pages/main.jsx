import React from 'react';
import {Box, Container} from '@material-ui/core';
import AdminTabs from "../admin-tabs";
import Customers from './customers';
import Cities from './cities';
import Masters from './masters';
import Services from "./services";
import Orders from "./orders";
import {getColumnNames, addItem, updateItem, deleteItem, getItems} from '../requests'

const Main = () => {

	return (
		<Container>
			<Box mt={3}>
				<AdminTabs labels={["customers", "masters", "cities", "services", 'orders']}>
					<Customers getItems={getItems} deleteItem={deleteItem} updateItem={updateItem} addItem={addItem}
										 getColumnNames={getColumnNames}/>
					<Masters getItems={getItems} deleteItem={deleteItem} updateItem={updateItem} addItem={addItem}
										 getColumnNames={getColumnNames}/>
					<Cities getItems={getItems} deleteItem={deleteItem} updateItem={updateItem} addItem={addItem}
									 getColumnNames={getColumnNames}/>
					<Services getItems={getItems} deleteItem={deleteItem} updateItem={updateItem} addItem={addItem}
									 getColumnNames={getColumnNames}/>
					<Orders getItems={getItems} deleteItem={deleteItem} updateItem={updateItem} addItem={addItem}
									 getColumnNames={getColumnNames}/>
				</AdminTabs>
			</Box>
		</Container>
	);
}

export default Main;