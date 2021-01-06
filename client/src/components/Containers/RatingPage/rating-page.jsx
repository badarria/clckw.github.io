import React, { useEffect } from "react";
import { Container, Paper } from "@material-ui/core";
import { RatingCard } from "./rating-card";
import {
  getOrder,
  setRating,
} from "../../../middleware/rating/rating-client-thunks";
import {
  getLoadingState,
  getStatusState,
  orderToRateState,
} from "../../../middleware/state-selectors";
import { compose } from "redux";
import { connect } from "react-redux";
import { Loader } from "../../Common/loader";
import { NoRatingCard } from "./no-rating-card";
import { useRatingStyles } from "../../styles/styles";

const RatingPage = (props) => {
  const {
    orderId,
    orderToRate = {},
    status,
    getOrder,
    setRating,
    loading,
  } = props;
  const classes = useRatingStyles();

  useEffect(() => {
    getOrder(orderId);
  }, []);

  const { rated, msg } = status;

  return (
    <>
      <Loader loading={loading} />
      <Container>
        <Paper className={classes.blank}>
          {rated ? (
            <NoRatingCard {...{ msg }} />
          ) : (
            <RatingCard {...{ order: orderToRate, setRating }} />
          )}
        </Paper>
      </Container>
    </>
  );
};

export const mapDispatchToProps = (dispatch) => ({
  getOrder: (orderId) => dispatch(getOrder(orderId)),
  setRating: (data) => dispatch(setRating(data)),
});

export const mapStateToProps = (state, ownProps) => ({
  orderToRate: orderToRateState(state),
  orderId: ownProps,
  loading: getLoadingState("rating", state),
  status: getStatusState(state),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  RatingPage
);
