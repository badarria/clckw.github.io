import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  btn: { margin: '16px 16px 0' },
  title: { margin: '16px 32px 0', padding: 0 },
  dialog: {
    '&.MuiDialog-root': {
      margin: 0,
      padding: 0,
      zIndex: '1200',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    padding: '0 16px 24px',
  },
  fields: {
    margin: '16px 16px 0',
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 0px 0px',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkBox: {
    margin: '0px 16px -2px 8px',
    padding: 0,
    display: 'flex',
    alignItems: 'flex-end',
  },
})
