import { Typography, Box, Divider } from '@material-ui/core'
import { useStyles } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

export const PayForm = () => {
  const { box, line, item, amountBox, summ } = useStyles()
  const mailData = useSelector((state: RootState) => state.mailData)
  const amount = useSelector((state: RootState) => state.orderData?.service?.price)

  if (amount && mailData) {
    const { service, master, begin, userEmail } = mailData
    return (
      <>
        <Box className={box}>
          <Typography variant='h4'>Your order detail:</Typography>
          <span className={item}>Sevice: {service} </span>
          <span className={item}>Master: {master} </span>
          <span className={item}>Begin: {begin} </span>
          <span className={item}>Your email: {userEmail}</span>
          <Divider light className={line} />
        </Box>

        <Box className={amountBox}>
          <Typography variant='h5'>Order amount:</Typography>
          <Typography variant='h5' className={summ}>
            {amount} usd
          </Typography>
        </Box>
      </>
    )
  } else
    return (
      <>
        <Box className={box}>
          <Typography variant='h4'>Sorry, incorrect data</Typography>
        </Box>
      </>
    )
}
