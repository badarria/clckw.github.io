import { TextField } from '@material-ui/core'
import React from 'react'
import { InputFieldProps } from 'types'
import { useStyles } from './styles'

export const InputField = ({ defaultValue, label, register, errors }: InputFieldProps) => {
  const { fields, inputLabel, idInput, input, helperText } = useStyles()

  return (
    <TextField
      className={fields}
      defaultValue={defaultValue}
      label={label}
      name={label}
      InputLabelProps={{ className: inputLabel }}
      inputProps={{
        readOnly: label === 'id',
        className: `${label === 'id' ? idInput : null} ${input}`,
      }}
      required={label !== 'id'}
      error={!!errors[label]}
      helperText={errors[label]?.message || ''}
      autoComplete='nope'
      inputRef={register}
      FormHelperTextProps={{ className: helperText }}
    />
  )
}
