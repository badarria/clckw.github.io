import { getCustomer, getFreeMasters, loginUser } from "./home-requests";
import { addItem, getItems } from "../admin/admin-requests";
import {
  setFormData,
  setAuth,
  setFreeMasters,
  setWorkingHours,
  setNewOrder,
  setLoader,
} from "../../redux/home-reducer";
import { dateToRequest, getHoursArray } from "../utils/date-time-func";
import { mergeWithForeignKeys } from "../utils/table-func";
import {
  _getAdminInitState,
  _resetAdminState,
  _setHomePageToastMsg,
  _setItems,
} from "../common";

export const getInitState = async (dispatch, getState) => {
  const isCityInit = getState().home.formData.city === "";
  const isServiceInit = getState().home.formData.service === "";
  const isLoading = getState().home.loading;

  if (!isLoading && isCityInit && isServiceInit) {
    dispatch(setLoader(true));
    const data = { limit: "all", offset: 0, orderby: "id", order: "asc" };
    const city = await getItems("cities", data);
    const service = await getItems("services", data);
    const hours = getHoursArray(service.time);
    const formData = Object.entries(getState().home.formData);
    const keys = { city: city.items, service: service.items };
    const res = mergeWithForeignKeys(formData, keys);
    res.hours = hours;
    dispatch(setFormData(res));
    dispatch(setLoader(false));
  }
};

export const setOrderData = (data) => (dispatch) => {
  if (data.date instanceof Date) {
    data.date = dateToRequest(data.date);
  }
  dispatch(setNewOrder(data));
};

export const changeHours = (service_time) => (dispatch) => {
  const newHours = getHoursArray(service_time);
  dispatch(setWorkingHours(newHours));
};

export const findMasters = (data) => async (dispatch) => {
  dispatch(setFreeMasters([]));
  dispatch(setLoader(true));
  const masters = await getFreeMasters(data);
  dispatch(setLoader(false));
  if (masters.length) {
    dispatch(setFreeMasters(masters));
    return true;
  } else {
    let msg = "Sorry, there are no free masters. Try to choose another time";
    _setHomePageToastMsg({ type: "info", msg }, dispatch);
    return false;
  }
};

export const checkCustomer = (data) => async (dispatch, getState) => {
  let id = await getCustomer(data);
  const order = { ...getState().home.newOrder };
  order.customer = id[0];
  dispatch(setOrderData(order));
};

export const acceptOrder = (id) => async (dispatch, getState) => {
  dispatch(setLoader(true));
  const order = { ...getState().home.newOrder };
  const isAuth = getState().home.isAuth;
  order.master = { id };
  dispatch(setOrderData(order));
  const data = { ...getState().home.newOrder };
  const res = await addItem(data, "orders");
  if (isAuth) {
    const ordersOpt = getState().orders.paging;
    const customersOpt = getState().customers.paging;
    await dispatch(_setItems("orders", ordersOpt));
    await dispatch(_setItems("customers", customersOpt));
  }
  dispatch(setLoader(false));
  if (res.type === "success") {
    dispatch(setOrderData({}));
    dispatch(setFreeMasters([]));
  }
  _setHomePageToastMsg(res, dispatch);
};

export const login = (data) => async (dispatch) => {
  dispatch(setLoader(true));
  const res = await loginUser(data);
  if (res.token) {
    localStorage.setItem("token", res.token);
    dispatch(setAuth(true));
    await dispatch(_getAdminInitState);
    dispatch(setLoader(false));
    return { status: true, msg: "Success" };
  } else {
    dispatch(setLoader(false));
    return { status: false, msg: res };
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setAuth(false));
  dispatch(_resetAdminState);
};
