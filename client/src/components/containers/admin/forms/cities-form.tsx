import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cities } from '../../../../services/admin/validation/schema'
import { InputField, TableForm } from '../components'
import { City } from '../../../../types'
import { State } from '../../admin/types'

type Props = { cancel: () => void; accept: (data: { id: number; name: string }) => void; data: City; editState: State }

export const CitiesForm = ({ data: { id = 0, name }, cancel, accept, editState }: Props) => {
  const defaultValues = { id, name }
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
