import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  input: { fontSize: '14px' },
  fields: { margin: '16px' },
  idInput: {
    color: 'lightgray',
    maxWidth: '40px',
    '&:hover': { cursor: 'auto' },
  },
  inputLabel: { textTransform: 'capitalize' },
  helperText: {
    position: 'absolute',
    width: '100%',
    overflowWrap: 'break-word',
    top: '100%',
  },
  dialog: { maxWidth: '100%' },
  alertForm: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  inputFields: { display: 'flex' },
  btns: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  alertBtnsBox: {
    display: 'flex',
  },
})
