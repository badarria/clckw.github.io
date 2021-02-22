import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'

export const MastersForm = ({ data: { id = 0, name, surname, city }, cancel, accept }) => {
  const defaultValues = { id, name, surname, city: city[0] }
  const fields = { id, name, surname, city }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.masters),
  })

  const submit = (data) => {
    const { id, name, surname, city } = data
    accept({ id, name, surname, city: city.id })
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
