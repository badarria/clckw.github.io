import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core'
import React, { ReactElement } from 'react'

type Props = IconButtonProps & {
  title: string
  icon: ReactElement<IconButtonProps> | null
  onClick: Function
  disabled: boolean
  type: string
}

export const ButtonIcon = (props: Props) => {
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
