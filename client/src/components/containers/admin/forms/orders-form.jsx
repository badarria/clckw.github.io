import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm, DatePicker, SelectField } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { dateFromFormatToObj, dateFromNewDate, dateToRequest, getBeginFinish } from '../../../../services/utils/datetime-func'
import { changeFreeHours } from '../../../../services/admin'

export const OrdersForm = ({ data, cancel, accept }) => {
  const { id = 0, master, customer, service, date, hours } = data
  const fields = { id, master, customer, service }
  const [newHours, setNewHours] = useState(hours)
  const dateToObj = date ? dateFromFormatToObj(data.date) : dateFromNewDate()

  const defaultValues = {
    id,
    master: master[0],
    customer: customer[0],
    service: service[0],
    date: dateToObj,
    hours: hours[0].hour,
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
          order_id: id,
        }
        const res = await changeFreeHours(data)
        setNewHours(res)
      }
      changeHours()
    }
  }, [masterValue, dateValue, serviceValue])

  const submit = (data) => {
    const { id, master, customer, service, date, hours } = data
    const { begin, finish } = getBeginFinish(date, hours, service.time)
    data = {
      id,
      master: master.id,
      customer: customer.id,
      service: service.id,
      begin,
      finish,
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
