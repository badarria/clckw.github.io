import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cities } from '../../../../services/admin/validation/schema'
import { InputField, TableForm } from '../components'
import { CitiesFormProps } from 'types'

export const CitiesForm = ({ data: { id = 0, name }, cancel, accept, editState }: CitiesFormProps) => {
  const defaultValues: any = { id, name }
  const labels = Object.keys({ id, name })
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(cities),
  })

  const formProps = {
    submit: handleSubmit((data) => accept(data)),
    reset: () => {
      cancel()
      reset()
    },
    editState,
  }

  return (
    <TableForm {...formProps}>
      {labels.map((label, inx) => (
        <InputField key={inx} register={register} label={label} errors={errors} />
      ))}
    </TableForm>
  )
}
