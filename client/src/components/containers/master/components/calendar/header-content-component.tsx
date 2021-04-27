import React, { MouseEventHandler } from 'react'
import { Typography, Box, IconButton } from '@material-ui/core'
import { useStyles } from './styles'
import { SchedulerTime } from '../../../../../services/utils/datetime-func'
import CloseIcon from '@material-ui/icons/Close'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'

type Props = {
  appointmentData?: AppointmentModel
  onHide?: MouseEventHandler<HTMLButtonElement>
}

export const HeaderContentTooltip = ({ appointmentData, onHide }: Props) => {
  const { headerBox } = useStyles()

  if (appointmentData) {
    const { startDate, endDate } = appointmentData

    return (
      <>
        <Box className={headerBox}>
          <Typography>
            Begin: {SchedulerTime(startDate)} end: {SchedulerTime(endDate)}
          </Typography>
          <IconButton onClick={onHide} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </>
    )
  }
  return <Box className={headerBox}>Something went wrong</Box>
}
