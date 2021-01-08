import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormFieldsGenerator } from '../../../Common/form/form-fields-generator'
import { ControlledDatePicker } from '../../../Common/form/controlled-date-picker'
import { ControlledSelect } from '../../../Common/form/controlled-select'
import { BasicTableForm } from '../../../Common/form/basic-table-form'
import { formDispatchProps, formStateProps } from '../../utils/props-selector'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../validation/admin-schema'
import { dateToRequest, getBeginEnd } from '../../../../middleware/utils/datetime-func'

const subj = 'orders'
const mapStateToProps = formStateProps(subj)
const mapDispatchToProps = formDispatchProps(subj)

const OrdersForm = (props) => {
  const { data, handleReset, changeHours, accept } = props
  const { fields, date, hours, begin } = data

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
    const normDate = dateToRequest(dateValue)
    if (!disableHours) {
      const data = {
        master_id: masterValue,
        date: normDate,
        service_time: serviceValue,
        order_id: fields.id,
      }
      changeHours(data)
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
      handleReset()
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
    data: hours,
    control,
    defaultValue: defaultValues.hours,
    name: 'hours',
    disabled: disableHours,
  }

  return (
    <BasicTableForm {...formProps}>
      <FormFieldsGenerator {...formFieldsProps} />
      <ControlledDatePicker control={control} />
      <ControlledSelect {...selectProps} />
    </BasicTableForm>
  )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(OrdersForm)
