import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderData, setMailData } from 'store/reducer'
import { MastersList } from '../components'
import { RootState } from 'store'

export const Masters = () => {
  const masters = useSelector((state: RootState) => state.masters)
  const history = useHistory()
  const dispatch = useDispatch()

  const back = useCallback(() => {
    history.replace('/')
  }, [])

  const confirm = useCallback(async (data) => {
    dispatch(setOrderData({ master: data }))
    dispatch(setMailData({ master: `${data.name} ${data.surname}` }))
    history.replace('/payment')
  }, [])

  const MasterListProps = { confirm, back, data: masters }

  return <MastersList {...MasterListProps} />
}
