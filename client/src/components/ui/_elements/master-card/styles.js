import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  card: {
    width: '24%',
    margin: '24px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stars: {
    margin: '16px 0',
    alignItems: 'center',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
  },
})
