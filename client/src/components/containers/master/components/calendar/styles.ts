import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  container: { margin: '100px auto 100px' },
  box: { padding: '0 8px 0' },
  tooltipBox: { margin: '8px 16px 24px', display: 'flex', flexDirection: 'column' },
  headerBox: {
    padding: '16px 16px 8px',
    boxShadow: '0px 1px 0 #e8e8e8',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incompleted: {
    border: '1px solid rgba(0 0 0/5%)',
    borderRadius: '3%',
    background: 'rgb(198 254 155)',
    height: '100%',
    '&:hover, &:active': {
      cursor: 'pointer',
      backgroundColor: 'rgb(168 246 109)',
    },
  },
  btn: {
    margin: '8px 0 0',
    alignSelf: 'flex-end',
  },
  complete: {
    background: '#eaeaea',
    height: '100%',
    border: '1px solid rgba(0 0 0/5%)',
    borderRadius: '3%',
    '&:hover, &:active': {
      cursor: 'pointer',
      backgroundColor: '#dcdcdc',
    },
  },
})
