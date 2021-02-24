import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonIcon, AlertDialog } from '../index'
import { AdminTableListProps, AllSubjectsDataUi } from 'types'

export const AdminTableList = (props: AdminTableListProps) => {
  const { remove, data, columns, editState, push } = props

  return (
    <>
      {data.map((item: AllSubjectsDataUi, inx: number) => {
        const id = item.id

        const alertProps = {
          title: !!editState ? 'You have to submit form first' : 'Remove item',
          icon: <DeleteIcon fontSize='small' />,
          disabled: !!editState,
          type: 'button',
        }

        const getDisabled = (data: AllSubjectsDataUi) => {
          if ('disabled' in data) return data.disabled
          else return !!editState
        }

        const getTitle = (data: AllSubjectsDataUi) => {
          if (!!editState) return 'You have to submit form first'
          else if ('disabled' in data && data.disabled) return 'Past is gone'
          else return 'Edit item'
        }

        return (
          <TableRow key={id} component='tr'>
            <TableCell component='td'>{inx + 1}</TableCell>
            {columns.map((key, i) => {
              const thisItem: any = { ...item }
              return <TableCell key={i}>{thisItem[key]}</TableCell>
            })}
            <TableCell align='right'>
              <ButtonIcon
                icon={<EditIcon fontSize='small' />}
                onClick={() => push(item)}
                disabled={getDisabled(item) as boolean}
                title={getTitle(item)}
                type='button'
              />
            </TableCell>
            <TableCell align='right'>
              <AlertDialog {...{ ...alertProps, accept: () => remove(id) }} />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
