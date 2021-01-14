import React, { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import MainSearchForm from './search-form'
import { MastersList } from '../../Common/cards/masters-list'
import { getFreeMastersState, getToastMsgState, getLoadingState } from '../../../middleware/state-selectors'
import { acceptOrder, stayAuth } from '../../../middleware/home/home-client-thunks'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Toast } from '../../Common/toast'
import { Loader } from '../../Common/loader'
import { useHomeStyle } from '../../styles/styles'

const HomePage = ({ mastersList, accept, toast, loading, stayAuth }) => {
  const classes = useHomeStyle()
  const [submitted, setSubmitted] = useState(0)

  useEffect(() => {
    if (toast.type === 'success') {
      setSubmitted(submitted + 1)
    }
  }, [toast])

  useEffect(() => {
    stayAuth()
  }, [])

  return (
    <Container className={classes.container}>
      <Box className={classes.wrap}>
        <Loader loading={loading} />
        <Typography variant='h4' component='h4' className={classes.title}>
          Repair your watch
        </Typography>
        <MainSearchForm key={submitted} />
        <Box className={classes.msgBox}>
          <Toast toast={toast} />
        </Box>
        {mastersList.length ? <MastersList data={mastersList} accept={accept} /> : null}
      </Box>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  mastersList: getFreeMastersState(state),
  toast: getToastMsgState('home', state),
  loading: getLoadingState('home', state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    accept: (data) => dispatch(acceptOrder(data)),
    stayAuth: () => dispatch(stayAuth),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(HomePage)
