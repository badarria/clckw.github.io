import React, { FC, ReactElement } from 'react'
import { Box, Container } from '@material-ui/core'
import { useStyles } from './styles'
import { LinkTabs } from './components'

const names = ['customers', 'masters', 'cities', 'services', 'orders']
type Props = { tabs: ReactElement }

export const Admin = ({ tabs }: Props) => {
  const { container } = useStyles()

  return (
    <Container className={container}>
      <Box mt={3}>
        <LinkTabs names={names} />
        {tabs}
      </Box>
    </Container>
  )
}
