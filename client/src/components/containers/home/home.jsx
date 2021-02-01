import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import SearchForm from './search-form/search-form'
import { useStyles } from './styles'

export const Home = () => {
  const { container, wrap, title } = useStyles()

  return (
    <Container className={container}>
      <Box className={wrap}>
        <Typography variant='h4' component='h4' className={title}>
          Repair your watch
        </Typography>
        <SearchForm />
      </Box>
    </Container>
  )
}
