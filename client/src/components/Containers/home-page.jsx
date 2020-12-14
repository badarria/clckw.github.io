import React from 'react'
import {Container} from '@material-ui/core'
import '../../App.css'
import MainSearchForm from "./HomePage/search-form";



export const HomePage = () => {
	return (
		<Container>
			<h1 style={{textAlign: 'center', padding: '32px 0 0'}}>Find master</h1>
			<MainSearchForm />
		</Container>
	)
}


