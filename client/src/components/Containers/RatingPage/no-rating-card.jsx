import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import { useRatingStyles } from "../../styles/styles";

export const NoRatingCard = ({ msg }) => {
  const classes = useRatingStyles();

  return (
    <>
      <Typography align="center">{msg}</Typography>
      <Button
        component={Link}
        to={"/"}
        color="primary"
        className={classes.btn}
        variant="contained"
      >
        Home Page
      </Button>
    </>
  );
};
