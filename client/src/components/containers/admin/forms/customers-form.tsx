import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { customers } from '../../../../services/admin/validation/schema'
import { InputField, AlertForm } from '../components'
import { Customer } from '../../../../types'
import { State } from '../../admin/types'

type Props = {
  cancel: () => void
  accept: (data: Customer) => void
  data: Customer
  editState: State
}

export const CustomersForm = ({ data, cancel, accept, editState }: Props) => {
  const { id, name, surname, email, password } = data
  const defaultValues = { id, name, surname, email, password }
  const labels: Array<keyof Customer> = ['id', 'name', 'surname', 'email', 'password']

  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(customers),
  })
  const title = editState && editState === 'isEditing' ? 'Edit existing customer' : 'Create new customer'
  const renderForm = editState !== null

  const formProps = {
    submit: handleSubmit((data: Customer) => accept(data)),
    reset: cancel,
    title,
    open: renderForm,
  }
  // console.log(register('surname'))

  return (
    <AlertForm {...formProps}>
      {labels.map((label, inx) => (
        <InputField key={inx} register={register} label={label} errors={errors} />
      ))}
    </AlertForm>
  )
}
