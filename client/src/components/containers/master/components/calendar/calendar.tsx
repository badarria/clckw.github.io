import React, { ChangeEvent, useState } from 'react'
import { Paper, Container, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  DayView,
  TodayButton,
  DateNavigator,
  Toolbar,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui'
import { SchedulerData } from '../../types'
import { AppointmentContent, ContentTooltip, HeaderContentTooltip } from '..'
import { useStyles } from './styles'
import { Response } from 'types'

type ExternalSwitcherProps = {
  currentViewName: string
  onChange: (event: ChangeEvent<HTMLInputElement>, view: string) => void
}
type Props = { schedulerData: SchedulerData[]; changeStatus: (id: number) => Promise<Response> }
const startDayHour = 8
const endDayHour = 20

export const Calendar = ({ schedulerData, changeStatus }: Props) => {
  const { container } = useStyles()
  const [currentViewName, setCurrentViewName] = useState('Month')

  const changeCurrentView = (event: ChangeEvent<HTMLInputElement>, view: string) => setCurrentViewName(view)

  const ExternalViewSwitcher = ({ currentViewName, onChange }: ExternalSwitcherProps) => (
    <RadioGroup
      aria-label='Views'
      style={{ flexDirection: 'row' }}
      name='views'
      value={currentViewName}
      onChange={onChange}>
      <FormControlLabel value='Day' control={<Radio />} label='Day' />
      <FormControlLabel value='Week' control={<Radio />} label='Week' />
      <FormControlLabel value='Month' control={<Radio />} label='Month' />
    </RadioGroup>
  )

  return (
    <Container className={container}>
      <ExternalViewSwitcher currentViewName={currentViewName} onChange={changeCurrentView} />
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState currentViewName={currentViewName} />
          <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
          <DayView name='Day' startDayHour={startDayHour} endDayHour={endDayHour} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={AppointmentContent} />

          <AppointmentTooltip
            showCloseButton
            contentComponent={ContentTooltip(changeStatus)}
            headerComponent={HeaderContentTooltip}
          />
        </Scheduler>
      </Paper>
    </Container>
  )
}
