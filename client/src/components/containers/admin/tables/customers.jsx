import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { CustomersForm } from '../forms'
import { containerDispatchProps, containerStateProps } from '../props-selector'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../../../ui'

const subj = 'customers'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)

const Customers = (props) => {
  const { items, columns, editState, remove, push, toast, loading, setPaging, paging } = props

  const { limit, offset, count, orderby, order } = paging
  const optionPagn = { limit, offset, count }
  const headProps = { columns, push, order, orderby, setChange: setPaging }
  const pagingProps = { option: optionPagn, setPaging }

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    pagination: <Pagination {...pagingProps} />,
    header: editState ? <CustomersForm /> : <AdminTableHead {...headProps} />,
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminTable {...tableProps} />
    </>
  )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Customers)
