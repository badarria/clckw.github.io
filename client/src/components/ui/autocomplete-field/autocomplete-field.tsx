import React from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useStyles } from './styles'

type Props = {
  data: any[]
  control: Control
  name: string
  keyToSelect: string
  errors: FieldErrors
  label?: string
}

export const AutocompleteField = (props: Props) => {
  const { data, control, name, keyToSelect, errors = {}, label = name } = props
  const { input, root, labels, error } = useStyles()
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
              label={label}
              autoComplete='nope'
              InputLabelProps={{ className: labels }}
              required
              inputRef={ref}
              helperText={errors[name]?.message || ''}
              FormHelperTextProps={{ className: error }}
            />
          )}
        />
      )}
    />
  )
}
