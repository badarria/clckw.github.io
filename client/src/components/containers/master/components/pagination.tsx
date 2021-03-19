import { TablePagination, TableRow } from '@material-ui/core'
import React, { MouseEvent, ChangeEvent } from 'react'
import { PaginationProps } from '../../../../types'

export const Pagination = ({ option: { limit, offset, count }, setPaging }: PaginationProps) => {
  const changeOffset = (event: MouseEvent | null, page: number) => setPaging({ offset: page * limit })
  const changeItemsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setPaging({ limit: event.target.value, offset: 0 })

  const page = Math.round(offset / limit)

  return (
    <TableRow>
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
    </TableRow>
  )
}
