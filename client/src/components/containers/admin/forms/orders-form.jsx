import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm, DatePicker, SelectField } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { dateToRequest, getBeginEnd } from '../../../../services/utils/datetime-func'
import { changeFreeHours, preparedOrdersData } from '../../../../services/admin'

export const OrdersForm = (props) => {
  const { data, cancel, accept } = props
  const { fields, date, hours, begin } = preparedOrdersData(data)
  const [newHours, setNewHours] = useState(hours)

  const defaultValues = {
    id: fields.id,
    master: fields.master[0],
    customer: fields.customer[0],
    service: fields.service[0],
    date: date,
    hours: begin,
  }

  const { register, handleSubmit, control, reset, watch, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.orders),
  })

  const masterValue = watch('master').id
  const dateValue = watch('date')
  const serviceValue = watch('service').time

  const disableHours = !(masterValue && serviceValue && dateValue)

  useEffect(() => {
    if (!disableHours) {
      const changeHours = async () => {
        const normDate = dateToRequest(dateValue)
        const data = {
          master_id: masterValue,
          date: normDate,
          service_time: serviceValue,
          order_id: fields.id,
        }
        const res = await changeFreeHours(data)
        setNewHours(res)
      }
      changeHours()
    }
  }, [masterValue, dateValue, serviceValue])

  const submit = (data) => {
    const { id, master, customer, service, date, hours } = data
    const { begin, end } = getBeginEnd(date, hours, service.time)
    data = {
      id,
      master: master.id,
      customer: customer.id,
      service: service.id,
      begin,
      end,
    }
    accept(data)
  }

  const formProps = {
    submit: handleSubmit((data) => submit(data)),
    reset: () => {
      cancel()
      reset()
    },
  }

  const formFieldsProps = {
    data: fields,
    register,
    control,
    errors,
    defaultValues,
  }

  const selectProps = {
    data: newHours,
    control,
    defaultValue: defaultValues.hours,
    name: 'hours',
    disabled: disableHours,
  }

  return (
    <TableForm {...formProps}>
      <FieldsGenerator {...formFieldsProps} />
      <DatePicker control={control} />
      <SelectField {...selectProps} />
    </TableForm>
  )
}
