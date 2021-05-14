import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { overflowX: 'hidden', margin: '100px auto 100px' },
  title: {
    padding: '16px',
  },
  radioBox: {
    margin: '0 16px 16px',
  },
  form: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 16px 0',
  },
  chipsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 16px 0',
  },
  chip: {
    margin: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    minWidth: '200px',
    maxWidth: '400px',
  },
  selectLabel: { padding: '0 16px 0' },
  formBox1: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    marginRight: '16px',
  },
  formBox2: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  chartBox: {
    margin: '24px 16px 32px',
  },
})
