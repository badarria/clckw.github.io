import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { overflowX: 'hidden', margin: '16px auto 100px' },
  wrapper: {
    padding: '1rem',
    border: '1px solid #eeeded',
    background: '#fafafa',
  },
  editor: {
    backgroundColor: '#fff',
    padding: '15px',
    border: '1px solid #eeeded',
    minHeight: '400px',
  },
  toolbar: {
    border: '1px solid #eeeded',
  },
  btns: {
    margin: '16px 0 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btn: { margin: '0px 16px' },

  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px auto 80px',
  },
  box: { margin: '16px 0 16px' },
  hidden: { display: 'none' },
  textArea: { margin: '16px 0 16px' },

  drag: { width: '35%', margin: '0 0 16px' },
  upperBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  fieldsBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
  },
})
