import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { useStyles } from './styles'
import { SchedulerTime } from '../../../../../services/utils/datetime-func'
import { AppointmentModel } from '@devexpress/dx-react-scheduler'

type Props = {
  data: AppointmentModel
  onClick?: (e: any) => void
}

export const AppointmentContent = (props: Props) => {
  const { onClick = () => console.log('on click function is not implemented'), data } = props
  const { startDate, endDate, completed } = data
  const { box, complete, incompleted } = useStyles()
  const click = () => onClick(props)

  return (
    <>
      <Box className={completed ? complete : incompleted} onClick={click}>
        <Box className={box}>
          <Typography variant='overline'>
            {SchedulerTime(startDate)} - {SchedulerTime(endDate)}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
