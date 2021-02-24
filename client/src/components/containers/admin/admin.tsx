import React, { FC } from 'react'
import { Box, Container } from '@material-ui/core'
import { useStyles } from './styles'
import { LinkTabs } from './components'

export const Admin: FC<{}> = ({ children }) => {
  const { container } = useStyles()
  const names = ['customers', 'masters', 'cities', 'services', 'orders']

  return (
    <Container className={container}>
      <Box mt={3}>
        <LinkTabs {...{ names }} />
        {children}
      </Box>
    </Container>
  )
}
