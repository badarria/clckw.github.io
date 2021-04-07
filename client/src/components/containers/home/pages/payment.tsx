import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { PayForm } from '../forms/payment/pay-form'
import { Container, Paper, Box, Typography, Button } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import { Loader, Toast } from '../components'
import { addNewOrder, handlePayment, sendConfirmLetter } from 'services/home/api'
import { getBeginFinish } from 'services/utils/datetime-func'
import { TypicalResponse } from 'types'
import { CheckoutForm } from '../forms/payment/checkout'
import { initState, setInit } from 'store/reducer'

const promise = loadStripe(
  'pk_test_51IbLzbK13PqXeZaYmoyqJmBCWV0K1sWOCGrFt0mkgF1t8YBYbq1VF3ojVBRtfGHpO3XHbCYMRYdcy26K7RBLr1zj00SU4On1Su'
)

export const Payment = () => {
  const { name, surname, email } = useSelector((state: RootState) => state.customerData)
  const mailData = useSelector((state: RootState) => state.mailData)
  const order = useSelector((state: RootState) => state.orderData)
  const amount = useSelector((state: RootState) => state.orderData.service.price)
  const { paper, msgBox, cardContainer, container, form } = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const [successMsg, setSuccessMsg] = useState('')

  const back = useCallback(() => {
    history.replace('/freeMasters')
  }, [])

  const backToMain = useCallback(() => {
    setSuccessMsg('')
    history.replace('/')
    dispatch(setInit())
  }, [])

  const setToastMsg = (toast: TypicalResponse) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const submit = async (func) => {
    setLoading(true)
    const res = await func(email, name, surname)
    if (res.error) {
      setToastMsg({ type: 'error', msg: res.paymentMethod.message || 'something went wrong' })
      setLoading(false)
    } else {
      const data = { id: res.paymentMethod.id, amount }
      const makePay = await handlePayment(data)
      if (makePay.type === 'success') {
        const { service, master, customer, date, time, files } = order
        const { begin, finish } = getBeginFinish(date, time, service.time)
        const orderData = { begin, finish, master: master.id, customer, files, service: service.id }

        const res = await addNewOrder(orderData)
        if (res.type === 'success') {
          setSuccessMsg(res.msg)
          sendConfirmLetter(mailData)
        } else setToastMsg(res)
      }
      setLoading(false)
    }
  }

  const CheckoutFormProps = { back, submit }

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Box className={cardContainer}>
        <Box className={msgBox}>
          <Toast toast={toast} />
        </Box>
        <Paper className={paper}>
          {successMsg ? (
            <Box className={form}>
              <Typography align='center'>{successMsg}</Typography>
              <Button variant='contained' onClick={backToMain} className={msgBox} color='primary'>
                Back to main page
              </Button>
            </Box>
          ) : (
            <Elements stripe={promise}>
              <PayForm />
              <CheckoutForm {...CheckoutFormProps} />
            </Elements>
          )}
        </Paper>
      </Box>
    </Container>
  )
}
