import { TextField } from '@material-ui/core'
import React from 'react'
import { InputFieldProps } from 'types'
import { useStyles } from './styles'

export const InputField = ({ label, register, errors, name = label, type = 'text' }: InputFieldProps) => {
  const { fields, inputLabel, idInput, input, helperText } = useStyles()

  return (
    <TextField
      className={fields}
      // defaultValue={defaultValue}
      label={`${label}*`}
      type={type}
      name={name}
      InputLabelProps={{ className: inputLabel }}
      inputProps={{
        readOnly: label === 'id',
        className: `${label === 'id' ? idInput : null} ${input}`,
        autoComplete: 'off',
      }}
      error={!!errors[name]}
      helperText={errors[name]?.message || ''}
      inputRef={register}
      FormHelperTextProps={{ className: helperText }}
    />
  )
}
