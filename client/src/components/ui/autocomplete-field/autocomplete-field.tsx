import React from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Controller } from 'react-hook-form'
import { useStyles } from './styles'
import { AutocompleteFieldProps } from 'types'

export const AutocompleteField = (props: AutocompleteFieldProps) => {
  const { data, control, name, keyToSelect, errors = {} } = props
  const { input, root, label, error } = useStyles()
  const defaultValue = data[0] || { id: 0, [keyToSelect]: '' }

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, ref }) => (
        <Autocomplete
          className={root}
          disableClearable
          defaultValue={defaultValue}
          filterOptions={(data) => data.filter((opt) => opt[keyToSelect])}
          getOptionLabel={(option) => option[keyToSelect]}
          options={data}
          classes={{ inputRoot: input }}
          getOptionSelected={(option, value) => option[keyToSelect] === value[keyToSelect]}
          onChange={(event, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={name}
              autoComplete='nope'
              InputLabelProps={{ className: label }}
              required
              inputRef={ref}
              helperText={errors[name]?.message || ''}
              FormHelperTextProps={{ className: error }}
              // input={input}
            />
          )}
        />
      )}
    />
  )
}
