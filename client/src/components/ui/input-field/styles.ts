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
})
