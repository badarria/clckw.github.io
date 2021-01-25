import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { containerDispatchProps, containerStateProps } from '../props-selector'
import { OrdersForm } from '../forms'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../../../ui'

const subj = 'orders'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, true)

const Orders = (props) => {
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
    header: editState ? <OrdersForm /> : <AdminTableHead {...headProps} />,
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminTable {...tableProps} />
    </>
  )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Orders)
