import React, { ChangeEvent, useState } from 'react'
import { Box, TextField } from '@material-ui/core'
import { DateRangePicker, DateRange } from 'materialui-daterange-picker'
import { useStyles } from './styles'
import { DateTime } from 'luxon'

export default () => {
  const [open, setOpen] = useState(true)
  const [range, setRange] = useState<DateRange>({})
  const { fieldBox } = useStyles()

  const toggle = () => setOpen(!open)
  const changeBegin = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const dateValue = DateTime
    setRange((range) => ({ ...range }))
  }

  return (
    <>
      <Box className={fieldBox}>
        <TextField value={range.startDate} label='Begin' />
        <TextField />
      </Box>
      <DateRangePicker open={open} toggle={toggle} onChange={(range) => setRange(range)} />
    </>
  )
}
