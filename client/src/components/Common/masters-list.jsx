import React from 'react';
import {
	makeStyles,
	Card,
	CardActions,
	CardContent,
	Typography,
	Box,
	Button
} from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";


const useStyle  = makeStyles({
	root: {
		maxWidth: '345px',
		margin: '24px'
	},
	box: {margin: '50px 0 20px'},
	listWrap: {display: 'flex', width: '70%', margin: '50px auto', padding: '30px'},
});


const BasicCard = ({id, name, surname, rating, accept}) => {
const classes = useStyle()

	return (
		<Card className={classes.root}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{`${name} ${surname}`}
					</Typography>
					<Box component="fieldset" mb={3} borderColor="transparent" className={classes.box}>
						<Typography component="legend">Rating</Typography>
						<Rating name="read-only" value={Number(rating)} readOnly/>
					</Box>
				</CardContent>
			<CardActions>
				<Button variant="contained" color="primary" fullWidth size='large' onClick={() => accept(id)}> Choose! </Button>
			</CardActions>
		</Card>
	);
}

export const MastersList = ({data = [], accept}) => {
	const classes = useStyle()
	return (
		<Paper className={classes.listWrap}>
			{data.map(({id, name, surname, rating}, inx) => <BasicCard {...{id, name, surname, rating, accept}} key={inx}/>)}
		</Paper>
	)
}