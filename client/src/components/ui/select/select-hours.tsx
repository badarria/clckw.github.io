import React from 'react'
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import { Control, Controller } from 'react-hook-form'
import { useStyles } from './styles'
import { useTranslation } from 'react-i18next'

type Props = {
  control: Control
  data: { hour: string; booked: boolean }[]
  name: string
  disabled: boolean
}

export const SelectHours = ({ control, data, name, disabled }: Props) => {
  const { root, input } = useStyles()
  const defaultValue = data[0] || { id: 0, name: '' }
  const { t } = useTranslation()

  return (
    <FormControl className={root}>
      <InputLabel htmlFor='trinity-select' required>
        {t('search.form.time')}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        as={
          <Select id={name} disabled={disabled} inputProps={{ className: input }}>
            {data.map(({ hour, booked }, inx) => (
              <MenuItem key={inx} value={hour} disabled={booked}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  )
}

SelectHours.defaultProps = {
  name: 'time',
  disabled: false,
  data: [],
}
