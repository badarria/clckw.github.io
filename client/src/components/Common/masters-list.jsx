import React from 'react';
import {
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
	Box
} from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		margin: '24px'
	},
});

const BasicCard = ({id, name, surname, rating, accept}) => {
	const classes = useStyles();


	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{`${name} ${surname}`}
					</Typography>
					<Box component="fieldset" mb={3} borderColor="transparent" style={{margin: '50px 0 20px'}}>
						<Typography component="legend">Rating</Typography>
						<Rating name="read-only" value={rating} readOnly/>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button variant="contained" color="primary" fullWidth sizeLarge onClick={() => accept(id)}> Choose! </Button>
			</CardActions>
		</Card>
	);
}

export const MastersList = ({data = [], accept}) => {
	return (
		<Paper style={{display: 'flex', width: '70%', margin: '50px auto', padding: '30px'}}>
			{data.map(({id, name, surname, rating}) => <BasicCard {...{id, name, surname, rating, accept}}/>)}
		</Paper>
	)
}