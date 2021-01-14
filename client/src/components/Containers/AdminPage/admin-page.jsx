import React, { useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import HorizontalTabs from '../../Common/horizontal-tabs'
import Customers from './Customers/customers-container'
import Cities from './Cities/cities-container'
import Masters from './Masters/masters-container'
import ServicesContainer from './Services/services-container'
import OrdersContainer from './Orders/orders-container'
import { useAdminStyles } from '../../styles/styles'
import { acceptOrder, stayAuth } from '../../../middleware/home/home-client-thunks'
import { compose } from 'redux'
import { connect } from 'react-redux'

const AdminPage = ({ stayAuth }) => {
  const classes = useAdminStyles()
  useEffect(() => {
    stayAuth()
  }, [])

  return (
    <Container className={classes.container}>
      <Box mt={3}>
        <HorizontalTabs labels={['customers', 'masters', 'cities', 'services', 'orders']}>
          <Customers />
          <Masters />
          <Cities />
          <ServicesContainer />
          <OrdersContainer />
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

export default compose(connect(null, mapDispatchToProps))(AdminPage)
