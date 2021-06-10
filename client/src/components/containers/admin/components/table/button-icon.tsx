import { IconButton, Tooltip } from '@material-ui/core'
import { ButtonIconProps } from '../../types'
import { useStyles } from './styles'

export const ButtonIcon = (props: ButtonIconProps) => {
  const { title, icon, onClick, disabled, type } = props
  const { titleFont } = useStyles()

  return (
    <Tooltip title={title} classes={{ tooltip: titleFont }}>
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
