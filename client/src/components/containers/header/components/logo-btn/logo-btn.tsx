import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useStyles } from './styles'

export default () => {
  const { title } = useStyles()

  return (
    <Button component={Link} to={'/'} className={title}>
      Clockware
    </Button>
  )
}
