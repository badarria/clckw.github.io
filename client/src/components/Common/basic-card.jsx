import React from 'react';
import {
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Box
} from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";


const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

export const BasicCard = ({name, surname, rating}) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Photo"
					height="140"
					image="#"
					style={{background: 'gray'}}
					title="Master"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{`${name} ${surname}`}
					</Typography>
					<Box component="fieldset" mb={3} borderColor="transparent">
						<Typography component="legend">Rating</Typography>
						<Rating name="read-only" value={rating} readOnly/>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button color="primary" >
					Choose!
				</Button>
			</CardActions>
		</Card>
	);
}