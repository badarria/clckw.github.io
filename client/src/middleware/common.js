import {
  setColumnsAction,
  setInitStateAction,
  setItemsAction,
  setLoadingAction,
  setPagingAction,
  setToastMsgAction,
} from "./admin/admin-actions-selector";
import { getFilteredOrders, getItems } from "./admin/admin-requests";
import { getHoursArray, setDisabled } from "./utils/date-time-func";
import { setToastMsg } from "../redux/home-reducer";
import { subjects } from "../components/Containers/init-params";

export const _setAdminPageToastMsg = (subj, toast, dispatch) => {
  dispatch(setToastMsgAction(subj, toast));
  setTimeout(() => {
    dispatch(setToastMsgAction(subj, { type: toast.type, msg: "" }));
  }, 3000);
};

export const _setItems = (subj) => async (dispatch, getState) => {
  const opt = getState()[subj].paging;
  const data = await getItems(subj, opt);
  let { items, count } = data;
  if (Array.isArray(items)) {
    const paging = { ...getState()[subj].paging };
    paging.count = count;
    if (subj === "orders") items = setDisabled(items);
    await dispatch(setItemsAction(subj, items));
    dispatch(setPagingAction(subj, paging));
    return true;
  } else {
    _setAdminPageToastMsg(
      subj,
      { type: "error", msg: "Something went wrong" },
      dispatch
    );
    return false;
  }
};

export const _getFreeHours = async (data) => {
  const { master_id, date, service_time, order_id = 0 } = data;
  const orders = await getFilteredOrders(
    { master_id, date, order_id },
    "orders"
  );
  return getHoursArray(service_time, orders);
};

export const _setHomePageToastMsg = (toast, dispatch) => {
  dispatch(setToastMsg(toast));
  setTimeout(() => {
    dispatch(setToastMsg({ type: toast.type, msg: "" }));
  }, 3000);
};

export const _resetAdminState = (dispatch) => {
  for (let i = 0; i < subjects.length; i += 1) {
    const subj = subjects[i][0];
    dispatch(setInitStateAction(subj));
  }
};

export const _getAdminInitState = async (dispatch, getState) => {
  for (let i = 0; i < subjects.length; i += 1) {
    const subj = subjects[i][0];
    const columns = subjects[i][1];
    const data = getState()[subj].paging;
    const done = await dispatch(_setItems(subj, data));
    if (done) {
      dispatch(setColumnsAction(subj, columns));
    }
  }
  return true;
};

// export const _setPaging = (subj, data) => (dispatch) => {
//   dispatch(setPagingAction(subj, data));
// };
