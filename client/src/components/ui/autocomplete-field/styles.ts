import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  input: { padding: '3px 0 7px', fontSize: '14px' },
  root: { margin: '16px', minWidth: '130px' },
  label: { textTransform: 'capitalize' },
  error: { position: 'absolute', bottom: '-50%', color: 'red' },
})
