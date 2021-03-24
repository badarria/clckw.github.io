import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AutocompleteField, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { services } from '../../../../services/admin/validation/schema'
import { ServicesFormProps } from 'types'
import { TextField } from '@material-ui/core'
import { useStyles } from './styles'
import { getServiceTime } from 'services/utils/table-func'

export const ServicesForm = ({ data: { id = 0, name, time }, cancel, accept, editState }: ServicesFormProps) => {
  const defaultValues: Record<string, any> = { id, name, time }
  const labels = Object.keys({ id, name })
  const { fields, inputLabel, idInput, input, helperText } = useStyles()
  const [timeArr, setTime] = useState(getServiceTime())

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(services),
  })

  const formProps = {
    submit: handleSubmit((data) => {
      const { id, name, time } = data
      accept({ id, name, time: time.id })
    }),
    reset: () => {
      cancel()
      reset()
    },
    editState,
  }

  return (
    <TableForm {...formProps}>
      {labels.map((label, inx) => (
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
      ))}
      <AutocompleteField key='time' control={control} name='time' data={timeArr} keyToSelect='name' errors={errors} />
    </TableForm>
  )
}
