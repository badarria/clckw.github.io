import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm } from '../../../ui'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formDispatchProps, formStateProps } from '../props-selector'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'

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
    <TableForm {...formProps}>
      <FieldsGenerator {...formFieldsProps} />
    </TableForm>
  )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ServicesForm)
