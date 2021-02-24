import { IconButton, Tooltip } from '@material-ui/core'
import React, { FC } from 'react'
import { ButtonIconProps } from 'types'

export const ButtonIcon: FC<ButtonIconProps> = (props) => {
  const { title, icon, onClick, disabled, type } = props

  return (
    <Tooltip title={title}>
      <span>
        <IconButton onClick={onClick} disabled={disabled} type={type}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}

ButtonIcon.defaultProps = {
  disabled: false,
  type: 'button',
}
