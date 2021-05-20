import { Typography, Box, Divider } from '@material-ui/core'
import { useStyles } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useTranslation } from 'react-i18next'

export const PayForm = () => {
  const { box, line, item, amountBox, summ } = useStyles()
  const mailData = useSelector((state: RootState) => state.mailData)
  const amount = useSelector((state: RootState) => state.orderData?.service?.price)
  const { t } = useTranslation()

  if (amount && mailData) {
    const { service, master, begin, userEmail } = mailData
    return (
      <>
        <Box className={box}>
          <Typography variant='h4'>{t('payment.form.title')}</Typography>
          <span className={item}>{`${t('payment.form.service')} ${service}`}</span>
          <span className={item}>{`${t('payment.form.master')} ${master} `}</span>
          <span className={item}>{`${t('payment.form.begin')} ${begin}`} </span>
          <span className={item}>{`${t('payment.form.email')} ${userEmail}`}</span>
          <Divider light className={line} />
        </Box>

        <Box className={amountBox}>
          <Typography variant='h5'>{t('payment.form.amount')}</Typography>
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
          <Typography variant='h4'>{t(`payment.form.incorrectMsg`)}</Typography>
        </Box>
      </>
    )
}
