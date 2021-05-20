import { makeStyles } from '@material-ui/core/styles'
const color = '#e2e2e2'

export const useStyles = makeStyles({
  select: {
    textTransform: 'capitalize',
    color,
    fontSize: '16px',
    '&:before': {
      border: 'none',
      '&:hover': {
        border: 'none',
      },
    },
    '&:after': {
      border: 'none',
    },
    '&:hover': {
      border: 'none',
    },
  },
  items: {
    textTransform: 'capitalize',
  },
  icon: { fill: color },
  selectBox: { margin: '0 0 0 16px' },
})
