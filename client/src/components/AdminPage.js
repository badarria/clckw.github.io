import React from 'react'
import '../App.css'
import {Container, Box} from "@material-ui/core";
import VerticalTabs from './Admin/VerticalTabs'



function Admin() {
	return (
		<Box mt={5}>
			<Container>
				<VerticalTabs/>
			</Container>
		</Box>
	)
}

export default Admin;