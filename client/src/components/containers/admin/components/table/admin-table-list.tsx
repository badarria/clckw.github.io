import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonIcon, AlertDialog } from '../index'
import { State, AllSubjectsData, AlertDialogProps, ButtonIconProps } from '../../../admin/types'

type Props = {
  remove: (id: number) => void
  data: Array<AllSubjectsData>
  columns: string[]
  editState: State
  push: (data: AllSubjectsData | string[]) => void
}

export const AdminTableList = (props: Props) => {
  const { remove, data, columns, editState, push } = props

  return (
    <>
      {data.map((item: AllSubjectsData, inx: number) => {
        const id = item.id

        const alertProps: AlertDialogProps = {
          title: !!editState ? 'You have to submit form first' : 'Remove item',
          icon: <DeleteIcon fontSize='small' />,
          question: 'Are you sure?',
          description: 'This item will be permanently removed from the database',
          disabled: !!editState,
          type: 'button',
          accept: () => remove(id),
        }

        const getDisabled = (data: AllSubjectsData) => {
          if ('status' in data && !editState) return !!data.status
          else return !!editState
        }

        const getTitle = (data: AllSubjectsData) => {
          if (!!editState) return 'You have to submit form first'
          else if ('status' in data && data.status) return 'You cannot change completed order'
          else return 'Edit item'
        }

        const buttonProps: ButtonIconProps = {
          icon: <EditIcon fontSize='small' />,
          onClick: () => push(item),
          disabled: getDisabled(item),
          title: getTitle(item),
          type: 'button',
        }

        return (
          <TableRow key={inx} component='tr'>
            {columns.map((key: string, i) => {
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
