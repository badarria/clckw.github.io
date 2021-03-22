import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { overflowX: 'hidden' },
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
})
