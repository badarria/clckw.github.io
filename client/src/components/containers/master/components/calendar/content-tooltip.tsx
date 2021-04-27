import React, { useState } from 'react'
import { Typography, Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { Response } from 'types'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'

type Props1 = (id: number) => Promise<Response>
type Props2 = {
  appointmentData?: AppointmentModel
}

export const ContentTooltip = (changeStatus: Props1) => {
  const { tooltipBox, btn } = useStyles()
  const [disabled, setDisabled] = useState(false)

  return ({ appointmentData }: Props2) => {
    if (appointmentData) {
      const { id, service, price, customer, rating, completed } = appointmentData
      completed && setDisabled(completed)

      const click = async () => {
        const res = await changeStatus(Number(id))
        if (res.type === 'success') setDisabled(true)
      }

      return (
        <>
          <Box className={tooltipBox}>
            <Typography>Service name: {service}</Typography>
            <Typography>Customer: {customer}</Typography>
            <Typography>Amount: {price}</Typography>
            <Typography>Rating: {rating ? rating : 'Not rated yet'}</Typography>
            <Button disabled={disabled} variant='contained' className={btn} color='primary' onClick={click}>
              Complete
            </Button>
          </Box>
        </>
      )
    }
    return <Box className={tooltipBox}>Something went wrong</Box>
  }
}
