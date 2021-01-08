import { createSlice } from '@reduxjs/toolkit'

const initState = () => ({
  list: null,
  columns: null,
  dataToChange: {},
  editState: null,
  toast: { type: 'success', msg: '' },
  loading: false,
  paging: { limit: 5, offset: 0, orderby: 'id', order: 'asc' },
})

export const createTableReducers = (subj) => {
  const { reducer, actions } = createSlice({
    name: subj,
    initialState: initState(subj),
    reducers: {
      [`set${subj}List`]: (state, action) => {
        state.list = action.payload
      },
      [`set${subj}Columns`]: (state, action) => {
        state.columns = action.payload
      },
      [`set${subj}State`]: (state, action) => {
        state.editState = action.payload
      },
      [`toggle${subj}EditState`]: (state, action) => {
        state.editState = action.payload
      },
      [`set${subj}DataToChange`]: (state, action) => {
        state.dataToChange = action.payload
      },
      [`change${subj}FreeHours`]: (state, action) => {
        state.dataToChange.hours = action.payload
      },
      [`set${subj}Init`]: (state) => {
        const initValues = Object.entries(initState())
        initValues.forEach(([key, value]) => (state[key] = value))
      },
      [`set${subj}ToastMsg`]: (state, action) => {
        state.toast = action.payload
      },
      [`set${subj}Loader`]: (state, action) => {
        state.loading = action.payload
      },
      [`set${subj}Paging`]: (state, action) => {
        state.paging = { ...state.paging, ...action.payload }
      },
    },
  })
  return { reducer: reducer, actions: actions }
}
