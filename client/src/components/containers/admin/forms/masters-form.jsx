import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { preparedMastersData } from '../../../../services/admin'

export const MastersForm = ({ data, cancel, accept }) => {
  const defaultValues = {
    id: data.id,
    name: data.name,
    surname: data.surname,
    city: data.city[0],
  }
  const preparedData = preparedMastersData(data)

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
  const formFieldsProps = { data: preparedData, register, control, errors, defaultValues }

  return (
    <TableForm {...formProps}>
      <FieldsGenerator {...formFieldsProps} />
    </TableForm>
  )
}
