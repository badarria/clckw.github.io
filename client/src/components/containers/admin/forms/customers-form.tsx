import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { customers } from '../../../../services/admin/validation/schema'
import { InputField, TableForm } from '../components'
import { CustomersFormProps } from 'types'

export const CustomersForm = ({ data: { id, name, surname, email }, cancel, accept }: CustomersFormProps) => {
  const defaultValues: any = { id, name, surname, email }
  const labels = Object.keys({ id: id || 0, name, surname, email })
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(customers),
  })

  const formProps = {
    submit: handleSubmit((data) => accept(data)),
    reset: () => {
      cancel()
    },
  }

  return (
    <TableForm {...formProps}>
      {labels.map((label, inx) => (
        <InputField key={inx} defaultValue={defaultValues[label]} register={register} label={label} errors={errors} />
      ))}
    </TableForm>
  )
}
