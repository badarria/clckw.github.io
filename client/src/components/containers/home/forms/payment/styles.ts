import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { margin: '0px auto 0px', width: '30%' },
  paper: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    fontSize: '18px',
    padding: '10px 0 0',
  },
  line: {
    margin: '10px 0 20px',
  },
  btnBox: {
    margin: '30px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnLeft: {
    margin: '0 20px 0 0',
  },
  amountBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  summ: {
    margin: '15px 0 0',
  },
  msg: {
    margin: '16px',
  },
  cardInput: {
    padding: '32px 0 16px',
  },
  card: {
    padding: '30px',
    margin: '100px auto 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  btnPay: {
    flexGrow: 1,
  },
  msgBox: { margin: '16px 0 16px' },
})
