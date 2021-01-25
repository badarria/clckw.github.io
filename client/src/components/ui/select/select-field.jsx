import React from 'react'
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import { useStyles } from './styles'

export const SelectField = ({ control, data, defaultValue, name, disabled }) => {
  const { root, input } = useStyles()

  return (
    <FormControl className={root}>
      <InputLabel htmlFor='trinity-select' required>
        Time
      </InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        as={
          <Select id={name} disabled={disabled} inputProps={{ className: input }}>
            {data.map(({ hour, booked }, inx) => (
              <MenuItem key={inx} value={hour} disabled={booked} MenuProps={{ classes: { list: input } }}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  )
}

SelectField.defaultProps = {
  name: 'time',
  disabled: false,
}
