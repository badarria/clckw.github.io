import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { customers } from '../../../../services/admin/validation/schema'
import { InputField, TableForm } from '../components'
import { Customer } from '../../../../types'
import { State } from '../../admin/types'

type Props = {
  cancel: () => void
  accept: (data: Customer) => void
  data: Customer
  editState: State
}

export const CustomersForm = ({ data: { id, name, surname, email, password }, cancel, accept, editState }: Props) => {
  const defaultValues = { id, name, surname, email, password }
  const labels = Object.keys({ id: id || 0, name, surname, email, password })
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(customers),
  })

  const formProps = {
    submit: handleSubmit((data: Customer) => accept(data)),
    reset: () => {
      cancel()
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
