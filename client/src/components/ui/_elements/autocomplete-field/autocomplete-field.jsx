import React from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Controller } from 'react-hook-form'
import { useStyles } from './styles'

export const AutocompleteField = (props) => {
  const { data, control, name, defaultValue } = props
  const { input, root, label } = useStyles()

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, ref }) => (
        <Autocomplete
          className={root}
          disableClearable
          defaultValue={defaultValue}
          filterOptions={(data) => data.filter((opt) => opt.name)}
          getOptionLabel={(option) => option.name}
          options={data}
          classes={{ inputRoot: input }}
          getOptionSelected={(option, value) => option.name === value.name}
          onChange={(event, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={name}
              autoComplete='nope'
              InputLabelProps={{ className: label }}
              required
              inputRef={ref}
              input={input}
            />
          )}
        />
      )}
    />
  )
}
