import React from 'react'
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import { useStyles } from './styles'
import { SelectHoursProps } from 'types'

export const SelectHours = ({ control, data, name, disabled }: SelectHoursProps) => {
  const { root, input } = useStyles()

  return (
    <FormControl className={root}>
      <InputLabel htmlFor='trinity-select' required>
        Time
      </InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={data[0]}
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
