import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  btn: { margin: '16px 16px 0' },
  title: { margin: '16px 32px 0', padding: '0px' },
  dialog: {
    '&.MuiDialog-root': {
      margin: '0px',
      padding: '0px',
      zIndex: '1200',
    },
  },
  signInForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '250px',
  },
  signUpForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    waxWidth: '250px',
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
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkBox: {
    margin: '0px 16px -2px 8px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0px 0px 0px 0px',
    '&.PrivateSwitchBase-root-59': {
      padding: '0px 0px 0px 0px',
    },
  },
  inputGrow: { flexGrow: 1 },
  btnGoogle: {
    margin: '8px 16px 0',
  },
  checkMasterBox: {
    margin: '8px 0 0',
  },
  msgBox: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    margin: '16px 16px 0',
  },
})
