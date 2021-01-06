import React from "react";
import { useRouteMatch, Redirect } from "react-router-dom";
import RatingPage from "../../Containers/RatingPage/rating-page";

export const RatingRoute = () => {
  const match = useRouteMatch("/orderRate/:orderId");
  const orderId = match?.params?.orderId || false;

  return orderId ? <RatingPage {...{ orderId }} /> : <Redirect to="/" />;
};
