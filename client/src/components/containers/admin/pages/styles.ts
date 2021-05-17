import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { overflowX: 'hidden', margin: '50px auto 100px', display: 'flex', flexDirection: 'column' },
  title: { margin: '16px' },
  halfBox: { width: '47%' },
  diagramsBox: { display: 'flex', justifyContent: 'space-between' },
  totalBox: { width: '100%' },
  box: { margin: '16px 0 16px' },
})
