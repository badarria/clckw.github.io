import React, { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import SearchForm from './form/search-form'
import { getFreeMastersState, getToastMsgState, getLoadingState } from '../../../store/selectors/state-selectors'
import { acceptOrder, stayAuth } from '../../../services/home'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useStyles } from './styles'
import { Loader, MastersList, Toast } from '../../ui'

const Home = ({ mastersList, accept, toast, loading, stayAuth }) => {
  const { container, wrap, msgBox, title } = useStyles()
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
    <Container className={container}>
      <Box className={wrap}>
        <Loader loading={loading} />
        <Typography variant='h4' component='h4' className={title}>
          Repair your watch
        </Typography>
        <SearchForm key={submitted} />
        <Box className={msgBox}>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home)
