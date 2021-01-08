import {
  editStateState,
  getToastMsgState,
  getColumnsState,
  getDataState,
  getItemsState,
  getLoadingState,
  getPagingState,
} from '../../../middleware/state-selectors'
import {
  accept,
  cancelInput,
  changeFreeHours,
  changePaging,
  pushToChange,
  removeFromDB,
} from '../../../middleware/admin/admin-client-thunks'

export const containerStateProps = (subj) => (state) => {
  return {
    items: getItemsState(subj, state),
    columns: getColumnsState(subj, state),
    dataToChange: getDataState(subj, state),
    editState: editStateState(subj, state),
    toast: getToastMsgState(subj, state),
    loading: getLoadingState(subj, state),
    paging: getPagingState(subj, state),
  }
}

export const containerDispatchProps = (subj, getKeys = false) => (dispatch) => {
  return {
    remove: (id) => dispatch(removeFromDB(subj, id)),
    push: (data, state) => dispatch(pushToChange(subj, data, state, getKeys)),
    handleReset: () => dispatch(cancelInput(subj)),
    accept: (data) => dispatch(accept(subj, data)),
    setPaging: (data) => dispatch(changePaging(subj, data)),
  }
}

export const formStateProps = (subj) => (state) => {
  return {
    data: getDataState(subj, state),
  }
}

export const formDispatchProps = (subj) => (dispatch) => {
  return {
    handleReset: () => dispatch(cancelInput(subj)),
    accept: (data) => dispatch(accept(subj, data)),
    changeHours: subj === 'orders' ? (data) => dispatch(changeFreeHours(subj, data)) : null,
  }
}
