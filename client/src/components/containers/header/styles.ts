import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    spaceBetween: 'justifyContent',
  },
  title: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
  },
  btns: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
})
