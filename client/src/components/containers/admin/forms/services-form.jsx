import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'

export const ServicesForm = ({ data: { id = 0, name, time }, cancel, accept }) => {
  const defaultValues = { id, name, time: time[0] }
  const fields = { id, name, time }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.services),
  })

  const submit = (data) => {
    const { id, name, time } = data
    accept({ id, name, time: time.id })
  }

  const formProps = {
    submit: handleSubmit((data) => submit(data)),
    reset: () => {
      cancel()
      reset()
    },
  }
  const formFieldsProps = { data: fields, register, control, errors, defaultValues }

  return (
    <TableForm {...formProps}>
      <FieldsGenerator {...formFieldsProps} />
    </TableForm>
  )
}
