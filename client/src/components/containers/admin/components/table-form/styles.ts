import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  dialog: { maxWidth: '100%' },
  alertForm: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  fields: { display: 'flex' },
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
