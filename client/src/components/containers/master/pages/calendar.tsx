import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useHistory } from 'react-router'
import { getSchedulerList, setDone } from '../../../../services/master'
import { SchedulerData } from '../types'
import { Calendar } from '../components'

export const Scheduler = () => {
  const [schedulerData, setSchedulerData] = useState<SchedulerData[]>([])
  const [loading, setLoading] = useState(false)

  const user = useSelector((state: RootState) => state.user)
  const history = useHistory()

  const getOrdersList = async () => {
    if (!user) return history.replace('/')
    setLoading(true)
    const orders = await getSchedulerList(user.id)
    setLoading(false)

    if ('type' in orders) return
    setSchedulerData(orders)
  }

  useEffect(() => {
    if (!loading) {
      getOrdersList()
    }
  }, [])

  const changeStatus = async (id: number) => {
    const status = await setDone(id)

    if (status.type === 'success') {
      getOrdersList()
    }
    return status
  }

  const calendarProps = { changeStatus, schedulerData }

  return <Calendar {...calendarProps} />
}
