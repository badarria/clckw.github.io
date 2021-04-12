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
import { TypicalResponseType } from 'types'
import { CheckoutForm } from '../forms/payment/checkout'
import { setInit } from 'store/reducer'
import { stripe_public_key } from '../../../../config'
const promise = loadStripe(stripe_public_key)

export const Payment = () => {
  const customer = useSelector((state: RootState) => state.customerData)
  const mailData = useSelector((state: RootState) => state.mailData)
  const order = useSelector((state: RootState) => state.orderData)
  const amount = useSelector((state: RootState) => state.orderData?.service?.price)

  const { paper, msgBox, cardContainer, container, form } = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<TypicalResponseType>({ type: 'success', msg: '' })
  const [successMsg, setSuccessMsg] = useState('')

  const back = useCallback(() => {
    history.replace('/freeMasters')
  }, [])

  const backToMain = useCallback(() => {
    setSuccessMsg('')
    history.replace('/')
    dispatch(setInit())
  }, [])

  const setToastMsg = (toast: TypicalResponseType) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const submit = async (func) => {
    setLoading(true)
    const res = customer && (await func(customer.email, customer.name, customer.surname))

    if (res.error) {
      setToastMsg({ type: 'error', msg: res.error.message || 'something went wrong' })
      setLoading(false)
    } else if (amount) {
      const data = { id: res.paymentMethod.id, amount }
      const makePay = await handlePayment(data)

      if (makePay.type === 'success' && order) {
        const { service, master, customer, date, time, files } = order
        const { begin, finish } = getBeginFinish(date, time, service.time)
        const orderData = { begin, finish, master: master.id, customer, files, service: service.id }

        const res = await addNewOrder(orderData)
        if (res.type === 'success') {
          setSuccessMsg(res.msg)
          mailData && sendConfirmLetter(mailData)
        } else setToastMsg(res)
      }
    } else setToastMsg({ type: 'error', msg: 'Something went wrong' })
    setLoading(false)
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
