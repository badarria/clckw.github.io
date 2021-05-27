import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { overflowX: 'hidden', margin: '50px auto 50px' },
  filtersBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    margin: '0 -16px',
  },
  selectsBox: { display: 'flex', justifyContent: 'space-between' },
  filter: { maxWidth: '100%' },
  accordion: { background: '#bfbfbf33' },
  detailBox: { display: 'flex', flexDirection: 'column' },
  chipsBox: {
    margin: '16px -8px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  fields: {
    margin: '0 16px',
  },
  title: {
    padding: '32px 0 16px',
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

  chip: {
    margin: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  select: {
    minWidth: '150px',
    maxWidth: '150px',
  },
  selectLabel: { textTransform: 'capitalize' },
  formBox1: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    marginRight: '16px',
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formBox2: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  chartBox: {
    margin: '24px 16px 32px',
  },
  noDataBox: {
    padding: '0 24px 16px',
  },
  wrap: {
    width: 'fit-content',
    margin: '0 auto',
  },
  root: {
    width: 'fit-content',
    margin: '0px auto 80px',
  },
  box: { margin: '16px 0 16px' },
  table: {
    minWidth: '600px',
    width: 'auto',
  },
  head: {
    textTransform: 'capitalize',
    background: '#bfbfbf33',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  serviceTime: {
    fontSize: '12px',
    padding: '8px',
  },
})
