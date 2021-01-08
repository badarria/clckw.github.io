import { createTableReducers } from '../../redux/table-reducers'

const action = (name) => createTableReducers(name).actions

const actions = {
  customers: action('customers'),
  services: action('services'),
  masters: action('masters'),
  cities: action('cities'),
  orders: action('orders'),
}

export const setItemsAction = (subj, data) => actions[subj][`set${subj}List`](data)
export const setColumnsAction = (subj, data) => actions[subj][`set${subj}Columns`](data)
export const setInitStateAction = (subj) => actions[subj][`set${subj}Init`]()
export const setDataToChangeAction = (subj, data) => actions[subj][`set${subj}DataToChange`](data)
export const toggleStateAction = (subj, data) => actions[subj][`toggle${subj}EditState`](data)
export const changeOrdersHoursAction = (subj, data) => actions[subj][`change${subj}FreeHours`](data)
export const setToastMsgAction = (subj, data) => actions[subj][`set${subj}ToastMsg`](data)
export const setLoadingAction = (subj, data) => actions[subj][`set${subj}Loader`](data)
export const setPagingAction = (subj, data) => actions[subj][`set${subj}Paging`](data)
