import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { margin: '100px auto 100px' },
  paper: { padding: '30px' },
  cardContainer: { margin: '0px auto 0px', width: '30%' },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapInput: {
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
  wrap: { width: '70%', margin: '0 auto' },

  title: { textAlign: 'center', margin: '50px 0 0' },
})
