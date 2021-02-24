import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'
import { useStyles } from './styles'

export const NoRatingCard = ({ msg }: { msg: string }) => {
  const { btn } = useStyles()

  return (
    <>
      <Typography align='center'>{msg}</Typography>
      <Button component={Link} to={'/'} color='primary' className={btn} variant='contained'>
        Home Page
      </Button>
    </>
  )
}
