import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cities } from '../../../../services/admin/validation/schema'
import { InputField, TableForm } from '../components'
import { City } from '../../../../types'
import { State } from '../../admin/types'

type Props = { cancel: () => void; accept: (data: City) => void; data: City; editState: State }

export const CitiesForm = ({ data, cancel, accept, editState }: Props) => {
  const { id, name } = data
  const defaultValues = { id, name }
  const labels: Array<keyof City> = ['id', 'name']

  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(cities),
  })

  const title = editState && editState === 'isEditing' ? 'Edit existing city' : 'Create new city'

  const formProps = {
    submit: handleSubmit(accept),
    cancel,
    title,
  }

  if (!editState) return null

  return (
    <TableForm {...formProps}>
      {labels.map((label, inx) => (
        <InputField key={inx} register={register} label={label} errors={errors} />
      ))}
    </TableForm>
  )
}
