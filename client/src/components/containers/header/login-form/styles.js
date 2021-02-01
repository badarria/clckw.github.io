import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  btn: { marginRight: '16px' },
  title: { padding: '16px 24px 16px' },
  dialog: {
    '&.MuiDialog-root': { margin: '0', padding: '0 24px 32px', zIndex: '1200' },
  },
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  content: { padding: '0px 24px 16px' },
  fields: { marginBottom: '16px' },
  btnWrap: { margin: '16px 0 16px' },
})
