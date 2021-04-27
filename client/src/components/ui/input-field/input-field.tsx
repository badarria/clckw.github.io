import { TextField } from '@material-ui/core'
import React, { Ref } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'
import { useStyles } from './styles'

type Props = {
  label: string
  register: Ref<RegisterOptions>
  errors: FieldErrors
  name?: string
  type?: string
}

export const InputField = ({ label, register, errors, name = label, type = 'text' }: Props) => {
  const { fields, inputLabel, idInput, input, helperText } = useStyles()

  console.log(label, name)

  return (
    <TextField
      className={fields}
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
