import { useMasterListStyle } from "../../styles/styles";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React from "react";

export const BasicCard = ({ id, name, surname, rating, accept }) => {
  const classes = useMasterListStyle();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2" align="center">
          {`${name} ${surname}`}
        </Typography>
        <Box
          component="fieldset"
          borderColor="transparent"
          className={classes.rating}
        >
          <Typography component="legend" align="center">
            Rating
          </Typography>
          <Rating name="read-only" value={Number(rating)} readOnly />
        </Box>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={() => accept(id)}
      >
        {" "}
        Choose!{" "}
      </Button>
    </Card>
  );
};
