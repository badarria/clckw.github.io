import React from 'react';
import {CircularProgress, Backdrop} from '@material-ui/core';
import {useLoaderStyles} from "../styles/styles";


export const Loader = ({loading}) => {
	const classes = useLoaderStyles();

	return (
		<Backdrop className={classes.backdrop} open={loading}>
			<CircularProgress color="primary"/>
		</Backdrop>
	);
}