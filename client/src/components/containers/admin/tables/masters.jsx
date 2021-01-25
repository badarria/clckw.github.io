import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { MastersForm } from '../forms'
import { containerDispatchProps, containerStateProps } from '../props-selector'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../../../ui'

const subj = 'masters'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, true)

const Masters = (props) => {
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
    header: editState ? <MastersForm /> : <AdminTableHead {...headProps} />,
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminTable {...tableProps} />
    </>
  )
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Masters)
