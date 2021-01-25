import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonIcon, AlertDialog } from './index'

export const AdminTableList = (props) => {
  const { remove, data, columns, editState, push } = props

  return data.map((item, inx) => {
    const id = item.id

    const alertProps = {
      title: !!editState ? 'You have to submit login-form first' : 'Remove item',
      icon: <DeleteIcon fontSize='small' />,
      disabled: !!editState,
    }

    return (
      <TableRow key={id} component='tr'>
        <TableCell component='td'>{inx + 1}</TableCell>
        {columns.map((key, i) => {
          return <TableCell key={i}>{item[key]}</TableCell>
        })}
        <TableCell align='right'>
          <ButtonIcon
            icon={<EditIcon fontSize='small' />}
            onClick={() => push(item, 'isEditing')}
            disabled={!!item.disabled || !!editState}
            title={!!editState ? 'You have to submit login-form first' : item.disabled ? 'Past is gone' : 'Edit item'}
          />
        </TableCell>
        <TableCell align='right'>
          <AlertDialog {...alertProps} accept={() => remove(id)} />
        </TableCell>
      </TableRow>
    )
  })
}
