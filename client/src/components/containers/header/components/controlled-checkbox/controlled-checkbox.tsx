import React from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox } from '@material-ui/core'
import { useStyles } from './styles'

const ControlledCheckbox = ({ control, name }) => {
  const { checkBox } = useStyles()

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <Checkbox
            color='primary'
            {...props}
            checked={props.value}
            onChange={(e) => props.onChange(e.target.checked)}
            className={checkBox}
          />
        )}
      />
    </>
  )
}

export default ControlledCheckbox
