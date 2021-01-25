import React, { useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import { Customers, Cities, Masters, Services, Orders } from './tables'
import { useStyles } from './styles'
import { stayAuth } from '../../../services/home'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { HorizontalTabs } from '../../ui'

const Admin = ({ stayAuth }) => {
  const { container } = useStyles()

  useEffect(() => {
    stayAuth()
  }, [])

  return (
    <Container className={container}>
      <Box mt={3}>
        <HorizontalTabs labels={['customers', 'masters', 'cities', 'services', 'orders']}>
          <Customers />
          <Masters />
          <Cities />
          <Services />
          <Orders />
        </HorizontalTabs>
      </Box>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    stayAuth: () => dispatch(stayAuth),
  }
}

export default compose(connect(null, mapDispatchToProps))(Admin)
