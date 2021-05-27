import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'
import { DateTime } from 'luxon'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { isoToJs } from 'services/utils/datetime-func'
import { Period } from '../../types'

const findPeriod = ({ begin, finish }: DateRange): Period => {
  const toDate = (date: MaterialUiPickersDate) => {
    if (!date) return DateTime.now()
    return DateTime.fromJSDate(date)
  }
  const beginJs = toDate(begin)
  const finishJs = toDate(finish)
  const { months } = finishJs.diff(beginJs, 'months')

  if (months <= 1) return 'day'
  else if (months <= 4) return 'week'
  return 'month'
}
const toStringDate = (date: MaterialUiPickersDate | null) => {
  if (date === null) return null
  if (!date) return DateTime.now().toISO()
  return DateTime.fromJSDate(date).toISO()
}

type DateRange = { begin: MaterialUiPickersDate; finish: MaterialUiPickersDate }
type Props = {
  getRange: (data: { begin: string | null; finish: string | null; period: Period }) => void
  initBegin: string | null
  initFinish: string | null
  required?: boolean
}

export default ({ getRange, initBegin, initFinish, required = true }: Props) => {
  const [range, setRange] = useState<DateRange>({ begin: isoToJs(initBegin), finish: isoToJs(initFinish) })
  const { fieldBox, inputField } = useStyles()

  const getStringData = () => {
    const { begin, finish } = range

    const beginToStr = toStringDate(begin)
    const finishToStr = toStringDate(finish)

    const period = findPeriod({ begin, finish })
    getRange({ begin: beginToStr, finish: finishToStr, period })
  }

  const changeBegin = (data: MaterialUiPickersDate) => setRange((range) => ({ ...range, begin: data }))
  const changeFinish = (data: MaterialUiPickersDate) => setRange((range) => ({ ...range, finish: data }))

  useEffect(() => {
    getStringData()
  }, [range])

  return (
    <>
      <Box className={fieldBox}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={inputField}
            disableToolbar
            required={required}
            onChange={changeBegin}
            value={range.begin}
            variant='inline'
            autoOk
            format='dd/MM/yy'
            margin='normal'
            id='begin'
            label='Begin'
          />
          <KeyboardDatePicker
            disableToolbar
            className={inputField}
            required={required}
            onChange={changeFinish}
            value={range.finish}
            variant='inline'
            autoOk
            format='dd/MM/yy'
            margin='normal'
            id='finish'
            label='Finish'
            minDate={range.begin}
          />
        </MuiPickersUtilsProvider>
      </Box>
    </>
  )
}
