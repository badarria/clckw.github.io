import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TableForm, DatePicker, Loader, InputField, AutocompleteField } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { orders } from '../../../../services/admin/validation/schema'
import {
  dateFromFormatToObj,
  dateFromNewDate,
  dateToRequest,
  getBeginFinish,
  getHoursArray,
} from '../../../../services/utils/datetime-func'
import { initOrderKeys, OrdersFormProps, SubmittedOrder } from 'types'
import { getOrdersKeys, getFilteredOrders } from 'services/admin/orders'
import { SelectHours } from 'components/ui/select/select-hours'

export const OrdersForm = ({ data, cancel, accept }: OrdersFormProps) => {
  const { id, date, c, m, s, begin } = data

  const orderKeys: initOrderKeys = {
    customer: [c],
    service: [s],
    master: [m],
  }

  const [keys, setKeys] = useState(orderKeys)
  const [newHours, setNewHours] = useState([{ hour: begin, booked: false }])
  const [loading, setLoading] = useState(false)

  const dateToObj = date ? dateFromFormatToObj(date) : dateFromNewDate()

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  useEffect(() => {
    const getKeys = async () => {
      const res = await setLoader(getOrdersKeys())
      const hours = getHoursArray(serviceValue)
      if ('master' in res) {
        setKeys({ ...keys, ...res })
        setNewHours(hours)
      }
    }
    getKeys()
  }, [])

  const defaultValues = {
    id,
    master: keys.master[0],
    customer: keys.customer[0],
    service: keys.service[0],
    date: dateToObj,
    hours: begin,
  }

  const { register, handleSubmit, control, reset, watch, errors } = useForm({
    defaultValues,
    resolver: yupResolver(orders),
  })

  const masterValue = watch('master').id
  const dateValue = watch('date')
  const serviceValue = watch('service').service_time

  const disableHours = !(masterValue && serviceValue && dateValue)

  useEffect(() => {
    if (!disableHours) {
      const changeHours = async () => {
        const normDate = dateToRequest(dateValue)
        const orders = await getFilteredOrders(masterValue, id, normDate)
        console.log(orders, 'orders')
        if (Array.isArray(orders)) {
          let res = getHoursArray(serviceValue, orders)
          console.log(res, 'serviceValue res array')
          setNewHours(res)
        }
      }
      changeHours()
    }
  }, [masterValue, dateValue, serviceValue])

  const submit = (data: SubmittedOrder) => {
    const {
      id,
      master,
      customer,
      service: { service_time },
      date,
      hours,
    } = data
    console.log(data, 'datatosubmit')
    const { begin, finish } = getBeginFinish(date, hours, service_time)
    const dataToReq = {
      id,
      master: master.id,
      customer: customer.id,
      service: data.service.id,
      begin,
      finish,
    }
    accept(dataToReq)
  }

  const formProps = {
    submit: handleSubmit((data) => submit(data)),
    reset: () => {
      cancel()
      reset()
    },
  }

  const selectProps = { data: newHours, control, name: 'hours', disabled: disableHours }

  return (
    <>
      <Loader loading={loading} />
      <TableForm {...formProps}>
        {id ? <InputField {...{ defaultValue: '', register, label: 'id', errors }} /> : null}
        <AutocompleteField control={control} name='master' data={keys.master} keyToSelect='fullName' errors={errors} />
        <AutocompleteField
          control={control}
          name='customer'
          data={keys.customer}
          keyToSelect='fullName'
          errors={errors}
        />
        <AutocompleteField control={control} name='service' data={keys.service} keyToSelect='service' errors={errors} />
        <DatePicker control={control} />
        <SelectHours {...selectProps} />
      </TableForm>
    </>
  )
}
