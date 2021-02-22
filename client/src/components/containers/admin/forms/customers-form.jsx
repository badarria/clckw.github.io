import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { TableForm, FieldsGenerator } from '../components'

export const CustomersForm = ({ data: { id, name, surname, email }, cancel, accept }) => {
  const defaultValues = { id, name, surname, email }
  const fields = { id: id || 0, name, surname, email }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.customers),
  })

  const formProps = {
    submit: handleSubmit((data) => accept(data)),
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
