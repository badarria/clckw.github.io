import React, { useEffect, useState } from 'react'
import { Paper, Box, Button, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { searchForm } from '../../../../services/home/validation/schema'
import { useStyles } from './styles'
import { TypicalResponse, Master, RawParamsForSearching } from 'types'
import { MastersList, DatePicker, AutocompleteField, Loader, Toast, InputField } from '../components'
import { SelectHours } from 'components/ui/select/select-hours'
import { addNewOrder, getCustomer, getFreeMasters, getInit, sendConfirmLetter } from 'services/home/api'
import { dateFromNewDate, getBeginFinish, getHoursArray, pastTime, toMailFormat } from 'services/utils/datetime-func'

export const SearchForm = () => {
  const { container, form, wrap, btn, msgBox } = useStyles()
  const initKeys = { city: [{ id: 0, name: '' }], service: [{ id: 0, name: '', time: '' }] }
  const initOrder = { service: 0, begin: '', finish: '', customer: 0, master: 0 }
  const initMail = { name: '', userEmail: '', city: '', begin: '', service: 'service.name', master: '', id: 0 }
  const initHours = pastTime(getHoursArray('1'))
  const findDefaultHour = () => {
    for (let item of initHours) {
      if (!item.booked) return item.hour
    }
    return '08:00'
  }

  const [loading, setLoading] = useState(false)
  const [keys, setKeys] = useState(initKeys)
  const [hours, setHours] = useState(initHours)
  const [masters, setMasters] = useState<Master[] | []>([])
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const [submitted, setSubmitted] = useState(0)
  const [order, setOrder] = useState(initOrder)
  const [mail, setMail] = useState(initMail)

  const defaultValues = {
    name: '',
    surname: '',
    email: '',
    city: keys.city[0],
    service: keys.service[0],
    date: dateFromNewDate(),
    hours: findDefaultHour(),
  }

  const { register, handleSubmit, control, watch, errors } = useForm({
    resolver: yupResolver(searchForm),
    defaultValues,
  })
  const service = watch('service')
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
    if (!loading) {
      const getData = async () => {
        const keys = await setLoader(getInit())
        if ('city' in keys) {
          setKeys(keys)
        }
      }
      getData()
    }
  }, [])

  useEffect(() => {
    const newHours = pastTime(getHoursArray(service.time), dateValue)
    setHours(newHours)
  }, [service, dateValue])

  const findFreeMasters = async (data: RawParamsForSearching) => {
    const { service, city, hours, date, email, name, surname } = data
    const { begin, finish } = getBeginFinish(date, hours, service.time)
    const dataForSearching = { city: city.id, begin, finish }
    const masters = await setLoader(getFreeMasters(dataForSearching))

    if (Array.isArray(masters) && masters.length) {
      setMasters(masters)
      const data = await getCustomer({ email, name, surname })
      if ('id' in data) {
        const orderData = { service: service.id, begin, finish, customer: data.id }
        const mailData = {
          name,
          userEmail: email,
          password: data.password,
          city: city.name,
          begin: toMailFormat(begin),
          service: service.name,
        }
        setOrder({ ...order, ...orderData })
        setMail({ ...mail, ...mailData })
      }
    } else {
      let msg = 'Sorry, there are no free masters. Try to choose another time'
      setToastMsg({ type: 'info', msg })
    }
  }

  const confirm = async ({ id, masterName }: { id: number; masterName: string }) => {
    setOrder((prevorder) => ({ ...prevorder, master: id }))
    setMail({ ...mail, master: masterName })
  }

  useEffect(() => {
    const addOrder = async () => {
      let res = await setLoader(addNewOrder(order))
      if (res.type === 'success') {
        setMasters([])
        setSubmitted(submitted + 1)
        setToastMsg(res)
        setOrder(initOrder)
      }
      if ('id' in res) {
        const first = await sendConfirmLetter(mail)
        console.log(first)
      }
    }
    if (order.master !== 0) {
      addOrder()
    }
  }, [order])

  const selectProps = { control, data: hours, name: 'hours' }
  const inputs = ['name', 'surname', 'email']

  return (
    <>
      <Loader loading={loading} />
      <Paper className={container}>
        <Typography align='center'>
          Enter your details, city, and size of the watch that needs to be repaired.
        </Typography>
        <Typography align='center'> Select a comfy date and time and we will find free masters for you. </Typography>
        <form
          onSubmit={handleSubmit((data: RawParamsForSearching) => findFreeMasters(data))}
          className={form}
          key={submitted}>
          <Box className={wrap}>
            {inputs.map((label, inx) => (
              <InputField {...{ defaultValue: '', register, errors, label }} key={inx} />
            ))}
            <AutocompleteField
              key='city'
              control={control}
              name='city'
              data={keys.city}
              keyToSelect='name'
              errors={errors}
            />
            <AutocompleteField
              key='service'
              control={control}
              name='service'
              data={keys.service}
              keyToSelect='name'
              errors={errors}
            />
            <DatePicker control={control} />
            <SelectHours {...selectProps} />
          </Box>
          <Box className={wrap}>
            <Button type='submit' variant='contained' color='primary' className={btn}>
              Find Master
            </Button>
          </Box>
        </form>
      </Paper>
      <Box className={msgBox}>
        <Toast toast={toast} />
      </Box>
      <MastersList data={masters} confirm={confirm} />
    </>
  )
}
