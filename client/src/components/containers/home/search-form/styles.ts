import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: {
    padding: '30px',
    flexWrap: 'wrap',
    margin: '50px auto 0px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrap: {
    margin: '10px 0 0',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  btn: {
    margin: '10px',
  },
  msgBox: { margin: '16px 0 16px' },
})
