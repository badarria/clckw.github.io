import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { TableForm, FieldsGenerator } from '../components'

export const CustomersForm = ({ data, cancel, accept }) => {
  const defaultValues = {
    id: data.id,
    name: data.name,
    surname: data.surname,
    email: data.email,
  }

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
  const formFieldsProps = { data, register, control, errors, defaultValues }

  return (
    <TableForm {...formProps}>
      <FieldsGenerator {...formFieldsProps} />
    </TableForm>
  )
}
