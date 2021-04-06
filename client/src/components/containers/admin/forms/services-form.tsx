import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AutocompleteField, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { services } from '../../../../services/admin/validation/schema'
import { ServicesFormProps } from 'types'
import { getServiceTime } from 'services/utils/table-func'
import { InputField } from 'components/ui'

const servHours = getServiceTime()

export const ServicesForm = ({ data: { id = 0, name, time, price }, cancel, accept, editState }: ServicesFormProps) => {
  const [timeArr, setTimeArr] = useState(servHours)
  const labels = Object.keys({ id, name })
  const initTime = timeArr.find(({ id }) => id === Number(time)) || timeArr[0]

  const defaultValues = { id, name, time: initTime, price }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(services),
  })

  const formProps = {
    submit: handleSubmit((data) => {
      const { time } = data
      accept({ ...data, time: time.id })
    }),
    reset: () => {
      cancel()
      reset()
    },
    editState,
  }

  return (
    <TableForm {...formProps}>
      {labels.map((label, inx) => (
        <InputField label={label} errors={errors} key={inx} register={register} />
      ))}
      <AutocompleteField
        key='time'
        control={control}
        name='time'
        data={timeArr}
        keyToSelect='name'
        errors={errors}
        defValue={initTime}
      />
      <InputField label='Price, usd' name='price' errors={errors} register={register} />
    </TableForm>
  )
}
