import React, { FormEvent, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Box, Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { StripeFunc } from '../../../../../types'
import { useTranslation } from 'react-i18next'

const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '18px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
  iconStyle: 'solid' as 'solid',
}
type Props = {
  back: () => void
  submit: (func: StripeFunc) => void
}

export const CheckoutForm = ({ back, submit }: Props) => {
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const { box, cardInput, btnBox, btnLeft, btnPay } = useStyles()
  const stripe = useStripe()
  const elements = useElements()
  const { t } = useTranslation('payment')

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (elements && stripe) {
      const cardElem = elements.getElement(CardElement) || { token: '' }
      const stripeFunc = (email: string, name: string, surname: string) =>
        stripe.createPaymentMethod({
          type: 'card',
          card: cardElem,
          billing_details: {
            email: email,
            name: `${name} ${surname}`,
          },
        })
      submit(stripeFunc)
    }
  }

  return (
    <>
      <form id='payment-form' onSubmit={handleSubmit} className={box}>
        <CardElement id='card-element' options={cardStyle} onChange={handleChange} className={cardInput} />
        {error && <Typography color='error'>{error}</Typography>}
      </form>
      <Box className={btnBox}>
        <Button variant='contained' startIcon={<ArrowBackIcon />} onClick={back} className={btnLeft}>
          {t('form.back')}
        </Button>
        <Button
          disabled={disabled}
          id='submit'
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          type='submit'
          className={btnPay}>
          <span id='button-text'>{t('form.payBtn')}</span>
        </Button>
      </Box>
    </>
  )
}
