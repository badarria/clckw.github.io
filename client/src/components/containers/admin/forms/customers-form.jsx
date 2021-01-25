import React from 'react'
import { useForm } from 'react-hook-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formDispatchProps, formStateProps } from '../props-selector'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/admin/validation/schema'
import { FieldsGenerator, TableForm } from '../../../ui'

const subj = 'customers'
const mapStateToProps = formStateProps(subj)
const mapDispatchToProps = formDispatchProps(subj)

const CustomersForm = ({ data, handleReset, accept }) => {
  const defaultValues = {
    id: data.id,
    name: data.name,
    surname: data.surname,
    email: data.email,
  }

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema.customers),
  })

  const formProps = {
    submit: handleSubmit((data) => accept(data)),
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(CustomersForm)
