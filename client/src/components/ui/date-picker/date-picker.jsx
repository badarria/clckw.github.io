import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Controller } from 'react-hook-form'
import { useStyles } from './styles'

export const DatePicker = (props) => {
  const { root, input } = useStyles()
  const { control } = props

  return (
    <Controller
      name='date'
      control={control}
      render={({ onChange, value }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={root}
            disableToolbar
            required
            onChange={(data) => onChange(data)}
            value={value}
            variant='inline'
            autoOk
            format='dd/MM/yy'
            margin='normal'
            id='date-picker'
            label='Select day'
            disablePast
            inputProps={{ className: input }}
            {...props}
          />
        </MuiPickersUtilsProvider>
      )}
    />
  )
}
