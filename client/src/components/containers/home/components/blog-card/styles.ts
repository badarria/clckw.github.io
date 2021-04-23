import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  card: { margin: '24px 0', height: '200px' },
  descr: { overflow: 'hidden', maxHeight: '70px' },
  content: { display: 'flex', justifyContent: 'space-between' },
  img: { height: '100%', width: '250px', objectFit: 'cover', padding: '0 0 0 16px' },
  link: { margin: '16px 0 0' },
})
