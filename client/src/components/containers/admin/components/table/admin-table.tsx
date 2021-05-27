import React, { ReactElement } from 'react'
import { Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow, Box } from '@material-ui/core'
import { useStyles } from './styles'
import { AdminTableList, Toast } from '../index'
import { AllSubjectsData, State } from '../../../admin/types'
import { Response } from '../../../../../types'

type Props = {
  items: Array<AllSubjectsData>
  columns: string[]
  remove: (id: number) => void
  push: (data: any) => void
  editState: State
  toast: Response
  header: ReactElement
  pagination: ReactElement
  filter?: ReactElement
}

export const AdminTable = (props: Props) => {
  const { items, columns, remove, push, editState, toast, header, pagination, filter } = props
  const { wrap, root, box, table, head } = useStyles()

  return (
    <Box className={wrap}>
      <Box className={box}>
        <Toast toast={toast} />
      </Box>
      {filter}
      <TableContainer component={Paper} className={root}>
        <Table className={table} aria-label={`table`}>
          <TableHead className={head}>{header}</TableHead>
          <TableBody>
            <AdminTableList data={items} remove={remove} push={push} editState={editState} columns={columns} />
          </TableBody>
          <TableFooter>
            <TableRow>{pagination}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}
