import React, { useEffect, useState } from 'react'
import { Paper, Box, Typography, Container } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStyles } from './styles'
import { TypicalResponse, SubmitData } from 'types'
import { Loader, Toast } from '../components'
import { getCustomer, getFreeMasters, getInit } from 'services/home/api'
import { SearchForm } from '../forms/search/search-form'
import {
  dateFromIso,
  dateToRequest,
  getBeginFinish,
  getHoursArray,
  pastTime,
  toMailFormat,
} from 'services/utils/datetime-func'
import { useDispatch, useSelector } from 'react-redux'
import { setInitState, setMailData, setMasters, setOrderData, setCustomerData } from 'store/reducer'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store'
import { searchFormSchema } from '../../../../services/home/validation/schema'

const initHours = pastTime(getHoursArray('1'))
const findDefaultHour = () => {
  for (let item of initHours) {
    if (!item.booked) return item.hour
  }
  return '08:00'
}

export const Search = () => {
  const { container, form, wrap, msgBox, paper, title } = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [hours, setHours] = useState(initHours)
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const { name, surname, email, id } = useSelector((state: RootState) => state.customerData)
  const { service, date, time, city } = useSelector((state: RootState) => state.orderData)
  const defaultDate = dateFromIso(date)
  const initState = useSelector((state: RootState) => state.initState)
  const defaultValues = {
    name,
    surname,
    email,
    city,
    service,
    date: defaultDate,
    hours: time || findDefaultHour(),
    files: [],
  }

  const { register, handleSubmit, control, watch, errors } = useForm({
    resolver: yupResolver(searchFormSchema),
    defaultValues,
  })

  const serviceValue = watch('service')
  const dateValue = watch('date')

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast: TypicalResponse) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  useEffect(() => {
    const isInitted = !!initState.city[0].id
    const getData = async () => {
      const keys = await setLoader(getInit())
      if ('city' in keys) {
        dispatch(setInitState(keys))
      }
    }
    !isInitted && !loading && getData()
  }, [])

  useEffect(() => {
    const newHours = pastTime(getHoursArray(serviceValue.time), dateValue)
    setHours(newHours)
  }, [serviceValue, dateValue])

  const findFreeMasters = async (data: SubmitData) => {
    const { service, city, hours, date, email, name, surname, files } = data
    const { begin, finish } = getBeginFinish(date, hours, service.time)
    const dataForSearching = { city: city.id, begin, finish }
    const masters = await setLoader(getFreeMasters(dataForSearching))

    if (Array.isArray(masters) && masters.length) {
      dispatch(setMasters(masters))
      const normDate = dateToRequest(date)
      const orderData = { service, date: normDate, time: hours, customer: id || 0, files, city }
      const mailData = {
        name,
        userEmail: email,
        password: '',
        city: city.name,
        begin: toMailFormat(begin),
        service: service.name,
      }

      if (!id) {
        const data = await getCustomer({ email, name, surname })

        if ('id' in data) {
          orderData.customer = data.id
          mailData.password = data.password
          const customerData = { name, surname, email, id: data.id }
          dispatch(setCustomerData(customerData))
        }
      }
      dispatch(setOrderData(orderData))
      dispatch(setMailData(mailData))
      history.push('/freeMasters')
    } else {
      let msg = 'Sorry, there are no free masters. Try to choose another time or date'
      setToastMsg({ type: 'info', msg })
    }
  }

  const searchFormProps = { control, errors, initState, hours, register }

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Box className={wrap}>
        <Typography variant='h4' component='h4' className={title}>
          Repair your watch
        </Typography>
        <Box className={msgBox}>
          <Toast toast={toast} />
        </Box>
        <Paper className={paper}>
          <Typography align='center'>
            Enter your details, city, and size of the watch that needs to be repaired.
          </Typography>
          <Typography align='center'> Select a comfy date and time and we will find free masters for you. </Typography>
          <form onSubmit={handleSubmit((data: SubmitData) => findFreeMasters(data))} className={form}>
            <SearchForm {...searchFormProps} />
          </form>
        </Paper>
      </Box>
    </Container>
  )
}
