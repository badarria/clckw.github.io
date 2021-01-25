import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  fields: { display: 'flex', maxWidth: '90%', alignItems: 'flex-end' },
  btns: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
})
