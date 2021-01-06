import { getOrderToRate, setOrderRating } from "./rating-requests";
import {
  setLoader,
  setOrderToRate,
  setStatus,
} from "../../redux/rating-reducer";

export const setRating = (data) => async (dispatch) => {
  const { orderId } = data;
  const result = await setOrderRating(data);
  const msg =
    result === orderId ? "Order has been successful rated!" : result.msg;
  dispatch(
    setStatus({
      rated: true,
      msg,
    })
  );
};

export const getOrder = (data) => async (dispatch) => {
  dispatch(setLoader(true));
  const result = await getOrderToRate(data);
  if (result.length) {
    dispatch(setOrderToRate(result[0]));
    dispatch(
      setStatus({
        rated: result[0].rating,
      })
    );
  } else if (!result.length) {
    dispatch(
      setStatus({
        rated: true,
        msg: "Sorry, no order found with this ID, please try another",
      })
    );
  } else {
    dispatch(
      setStatus({
        rated: true,
        msg: result.msg,
      })
    );
  }
  dispatch(setLoader(false));
};
