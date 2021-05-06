import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AutocompleteField, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { services } from '../../../../services/admin/validation/schema'
import { Service } from '../../../../types'
import { getServiceTime } from 'services/utils/table-func'
import { InputField } from 'components/ui'
import { State } from '../../admin/types'

const servHours = getServiceTime()
type Props = {
  cancel: () => void
  accept: (data: Service) => void
  editState: State
  data: Service
}

export const ServicesForm = ({ data, cancel, accept, editState }: Props) => {
  const { id, name, time, price } = data
  const [timeArr, setTimeArr] = useState(servHours)
  const labels: Array<keyof Service> = ['id', 'name']
  const initTime = timeArr.find(({ id }) => id === Number(time)) || timeArr[0]
  const defaultValues = { id, name, time: initTime, price }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(services),
  })

  const title = editState && editState === 'isEditing' ? 'Edit existing service' : 'Create new service'

  const formProps = {
    submit: handleSubmit((data) => {
      const { time } = data
      accept({ ...data, time: `${time.id}` })
    }),
    cancel,
    title,
  }

  if (!editState) return null

  return (
    <TableForm {...formProps}>
      {labels.map((label, inx) => (
        <InputField label={label} errors={errors} key={inx} register={register} />
      ))}
      <AutocompleteField key='time' control={control} name='time' data={timeArr} keyToSelect='name' errors={errors} />
      <InputField label='Price, usd' name='price' errors={errors} register={register} />
    </TableForm>
  )
}
