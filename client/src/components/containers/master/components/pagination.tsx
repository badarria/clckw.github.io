import { TablePagination, TableRow } from '@material-ui/core'
import React, { MouseEvent, ChangeEvent } from 'react'
import { Paging } from '../../../../types'

type Props = {
  option: { limit: number; offset: number; count: number }
  setPaging: (data: Paging) => void
}

export const Pagination = ({ option: { limit, offset, count }, setPaging }: Props) => {
  const changeOffset = (event: MouseEvent | null, page: number) => setPaging({ offset: page * limit })
  const changeItemsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newlimit = event.target.value === 'all' ? -1 : Number(event.target.value)
    setPaging({ limit: newlimit, offset: 0 })
  }

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
