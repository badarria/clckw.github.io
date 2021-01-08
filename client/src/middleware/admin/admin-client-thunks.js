import {
  addItem,
  updateItem,
  removeItem,
  getForeignKeys,
} from "./admin-requests";
import {
  setDataToChangeAction,
  toggleStateAction,
  changeOrdersHoursAction,
  setPagingAction,
  setLoadingAction,
} from "./admin-actions-selector";
import {
  emptyFields,
  getServiceTime,
  mergeWithForeignKeys,
} from "../utils/table-func";
import {
  _getFreeHours,
  _setAdminPageToastMsg,
  _setItems,
} from "../middleware-thunks";

export const removeFromDB = (subj, id) => async (dispatch) => {
  dispatch(setLoadingAction(subj, true));
  const res = await removeItem(id, subj);
  dispatch(setLoadingAction(subj, false));
  _setAdminPageToastMsg(subj, res, dispatch);
  if (res.type === "success") {
    dispatch(_setItems(subj));
  }
};

export const pushToChange = (subj, data, state, getKeys = false) => async (
  dispatch
) => {
  dispatch(setLoadingAction(subj, true));
  const foreignKeys = getKeys ? await getForeignKeys(subj) : {};
  let res = Array.isArray(data) ? emptyFields(data) : { ...data };
  if (foreignKeys) {
    res = mergeWithForeignKeys(Object.entries(res), foreignKeys);
  }
  if (subj === "orders") {
    res.hours = [{ hour: data.begin, booked: false }];
  }
  if (subj === "services") {
    let keys = { time: getServiceTime() };
    res.time_id = Number(res.time);
    res = mergeWithForeignKeys(Object.entries(res), keys);
  }
  dispatch(setDataToChangeAction(subj, res));
  dispatch(toggleStateAction(subj, state));
  dispatch(setLoadingAction(subj, false));
};

export const cancelInput = (subj) => (dispatch) => {
  dispatch(toggleStateAction(subj, null));
  dispatch(setDataToChangeAction(subj, {}));
};

export const accept = (subj, data) => async (dispatch, getState) => {
  dispatch(setLoadingAction(subj, true));
  const state = getState()[`${subj}`].editState;
  const res =
    state === "isEditing"
      ? await updateItem(data, subj)
      : await addItem(data, subj);
  if (res) {
    await dispatch(cancelInput(subj, dispatch));
    await dispatch(_setItems(subj));
    _setAdminPageToastMsg(subj, res, dispatch);
  }
  dispatch(setLoadingAction(subj, false));
};

export const changeFreeHours = (subj, data) => async (dispatch) => {
  const newHours = await _getFreeHours(data);
  dispatch(changeOrdersHoursAction(subj, newHours));
};

export const changePaging = (subj, opt) => async (dispatch) => {
  dispatch(setLoadingAction(subj, true));
  dispatch(setPagingAction(subj, opt));
  await dispatch(_setItems(subj));
  dispatch(setLoadingAction(subj, false));
};
