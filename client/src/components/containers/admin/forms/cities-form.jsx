import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { FieldsGenerator, TableForm } from '../components'

export const CitiesForm = ({ data: { id = 0, name }, cancel, accept }) => {
  const defaultValues = { id, name }
  const fields = { id: id, name }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.cities),
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
