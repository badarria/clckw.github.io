import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Control, Controller } from 'react-hook-form'
import { useStyles } from './styles'
import { useTranslation } from 'react-i18next'

export const DatePicker = (props: { control: Control }) => {
  const { root, input } = useStyles()
  const { control } = props
  const { t } = useTranslation()

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
            label={t('search.form.day')}
            inputProps={{ className: input }}
            {...props}
          />
        </MuiPickersUtilsProvider>
      )}
    />
  )
}
