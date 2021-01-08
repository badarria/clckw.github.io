import React from 'react'
import { useForm } from 'react-hook-form'
import { FormFieldsGenerator } from '../../../Common/form/form-fields-generator'
import { BasicTableForm } from '../../../Common/form/basic-table-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formDispatchProps, formStateProps } from '../../utils/props-selector'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../validation/admin-schema'

const subj = 'services'
const mapStateToProps = formStateProps(subj)
const mapDispatchToProps = formDispatchProps(subj)

const ServicesForm = ({ data, handleReset, accept }) => {
  const defaultValues = {
    id: data.id,
    name: data.name,
    time: data.time[0],
  }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.services),
  })

  const submit = (data) => {
    const { id, name, time } = data
    accept({ id, name, time: time.id })
  }

  const formProps = {
    submit: handleSubmit((data) => submit(data)),
    reset: () => {
      handleReset()
      reset()
    },
  }
  const formFieldsProps = { data, register, control, errors, defaultValues }

  return (
    <BasicTableForm {...formProps}>
      <FormFieldsGenerator {...formFieldsProps} />
    </BasicTableForm>
  )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ServicesForm)
