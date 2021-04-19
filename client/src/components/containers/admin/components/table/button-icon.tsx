import { IconButton, Tooltip } from '@material-ui/core'
import { ButtonIconProps } from '../../types'

export const ButtonIcon = (props: ButtonIconProps) => {
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
