import React, { useEffect } from 'react'
import { Container, Paper } from '@material-ui/core'
import { getOrder, setRating } from '../../../services/rating'
import { getLoadingState, getStatusState, orderToRateState } from '../../../store/selectors/state-selectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useStyles } from './styles'
import { NoRatingCard, RatingCard, Loader } from '../../ui'

const Rating = (props) => {
  const { orderId, orderToRate = {}, status, getOrder, setRating, loading } = props
  const { blank } = useStyles()

  useEffect(() => {
    getOrder(orderId)
  }, [])

  const { rated, msg } = status

  return (
    <>
      <Loader loading={loading} />
      <Container>
        <Paper className={blank}>
          {rated ? <NoRatingCard {...{ msg }} /> : <RatingCard {...{ order: orderToRate, setRating }} />}
        </Paper>
      </Container>
    </>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  getOrder: (orderId) => dispatch(getOrder(orderId)),
  setRating: (data) => dispatch(setRating(data)),
})

export const mapStateToProps = (state, ownProps) => ({
  orderToRate: orderToRateState(state),
  orderId: ownProps,
  loading: getLoadingState('rating', state),
  status: getStatusState(state),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(Rating)
