import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonIcon, AlertDialog } from '../index'
import { State, AllSubjectsDataUi } from '../../../admin/types'

type Props = {
  remove: (id: number) => void
  data: Array<AllSubjectsDataUi>
  columns: string[]
  editState: State
  push: (data: any) => void
}

export const AdminTableList = (props: Props) => {
  const { remove, data, columns, editState, push } = props

  return (
    <>
      {data.map((item: AllSubjectsDataUi, inx: number) => {
        const id = item.id

        const alertProps = {
          title: !!editState ? 'You have to submit form first' : 'Remove item',
          icon: <DeleteIcon fontSize='small' />,
          disabled: !!editState,
          type: 'button' as 'button',
          accept: () => remove(id),
        }

        const getDisabled = (data: AllSubjectsDataUi) => {
          if ('status' in data && !editState) return !!data.status
          else return !!editState
        }

        const getTitle = (data: AllSubjectsDataUi) => {
          if (!!editState) return 'You have to submit form first'
          else if ('status' in data && data.status) return 'You cannot change completed order'
          else return 'Edit item'
        }

        const buttonProps = {
          icon: <EditIcon fontSize='small' />,
          onClick: () => push(item),
          disabled: getDisabled(item),
          title: getTitle(item),
          type: 'button' as 'button',
        }

        return (
          <TableRow key={inx} component='tr'>
            {columns.map((key, i) => {
              const thisItem: any = { ...item }
              return <TableCell key={i}>{thisItem[key]}</TableCell>
            })}

            <TableCell align='right'>
              <ButtonIcon {...buttonProps} />
            </TableCell>
            <TableCell align='right'>
              <AlertDialog {...alertProps} />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
