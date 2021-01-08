import { TablePagination } from '@material-ui/core'
import React from 'react'

export const Pagination = (props) => {
  const { option, setPaging } = props
  const { limit, offset, count } = option

  const changeOffset = (event, page) => setPaging({ offset: page * limit })
  const changeItemsPerPage = (event) => setPaging({ limit: event.target.value, offset: 0 })

  const page = Math.round(offset / limit)

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 15, 25, { label: 'All', value: -1 }]}
      count={count}
      rowsPerPage={limit}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onChangePage={changeOffset}
      onChangeRowsPerPage={changeItemsPerPage}
    />
  )
}
