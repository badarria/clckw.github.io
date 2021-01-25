import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldsGenerator, TableForm } from '../../../ui'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formDispatchProps, formStateProps } from '../props-selector'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'

const subj = 'masters'
const mapStateToProps = formStateProps(subj)
const mapDispatchToProps = formDispatchProps(subj)

const MastersForm = ({ data, handleReset, accept }) => {
  const defaultValues = {
    id: data.id,
    name: data.name,
    surname: data.surname,
    city: data.city[0],
  }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.masters),
  })

  const submit = (data) => {
    const { id, name, surname, city } = data
    accept({ id, name, surname, city: city.id })
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(MastersForm)
