import React from 'react'
import { TextField } from '@material-ui/core'
import { AutocompleteField } from './autocomplete-field/autocomplete-field'
import { useStyles } from './styles'

export const FieldsGenerator = (props) => {
  const { data, register, control, errors, defaultValues } = props
  const { inputLabel, input, idInput, fields, helperText } = useStyles()
  const labels = Object.keys(data)

  return (
    <>
      {labels.map((label, inx) => {
        return Array.isArray(data[label]) ? (
          <AutocompleteField key={inx} control={control} name={label} data={data[label]} defaultValue={defaultValues[label]} />
        ) : (
          <TextField
            className={fields}
            defaultValue={defaultValues[label]}
            label={label}
            name={label}
            InputLabelProps={{ className: inputLabel }}
            inputProps={{
              readOnly: label === 'id',
              className: `${label === 'id' ? idInput : null} ${input}`,
            }}
            error={!!errors[label]}
            helperText={errors[label]?.message || ''}
            key={inx}
            autoComplete='nope'
            required={label !== 'id'}
            inputRef={register}
            FormHelperTextProps={{ className: helperText }}
          />
        )
      })}
    </>
  )
}
