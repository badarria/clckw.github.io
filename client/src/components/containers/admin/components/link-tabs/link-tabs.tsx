import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tabs, Tab, AppBar, Container } from '@material-ui/core'

export const LinkTabs = ({ names }: { names: string[] }) => {
  // const match = useLocation('/admin')
  const match = useLocation()
  const [value, setValue] = React.useState(match.pathname)

  useEffect(() => {
    setValue(match.pathname)
  }, [match])

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Container>
      <AppBar position='static' color='transparent' elevation={0}>
        <Tabs value={value} onChange={handleChange} indicatorColor='secondary' textColor='primary' centered>
          {names.map((name, inx) => (
            <Tab key={inx} label={name} to={`/admin/${name}`} component={Link} value={`/admin/${name}`} />
          ))}
        </Tabs>
      </AppBar>
    </Container>
  )
}
