import React, { useEffect, useState } from 'react'
import { Paper, Box, Button, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/home/validation/schema'
import { useStyles } from './styles'
import { acceptOrder, changeHours, findMasters, getInitState, processData } from '../../../../services/home'
import { MastersList, DatePicker, FieldsGenerator, Loader, SelectField, Toast } from '../components'

const SearchForm = ({ process, accept }) => {
  const { container, form, wrap, btn, msgBox } = useStyles()
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState({ name: '', surname: '', email: '', city: [], service: [] })
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState([''])
  const [masters, setMasters] = useState([])
  const [toast, setToast] = useState({ type: 'success', msg: '' })
  const [submitted, setSubmitted] = useState(0)

  const defaultFields = {
    name: '',
    surname: '',
    email: '',
    city: { id: null, name: '' },
    service: { id: null, name: '', time: '' },
  }
  const defaultValues = { ...defaultFields, date, hours: hours[0] }
  const { register, handleSubmit, control, watch, errors } = useForm({
    resolver: yupResolver(schema.form),
    defaultValues,
  })
  const service = watch('service')

  useEffect(() => {
    const { city, service } = fields
    if (!city.length && !service.length && !loading) {
      const getData = async () => {
        const { fields, date, hours } = await setLoader(getInitState(defaultFields))
        setFields(fields)
        setDate(date)
        setHours(hours)
      }
      getData()
    }
  }, [])

  useEffect(() => {
    if (service?.time) {
      const newHours = changeHours(service.time)
      setHours(newHours)
    }
  }, [service])

  const setLoader = async (doSomething) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const findFreeMasters = async (data) => {
    const masters = await setLoader(findMasters(data))
    if (masters.length) {
      setMasters(masters)
      process(data)
    } else {
      let msg = 'Sorry, there are no free masters. Try to choose another time'
      setToastMsg({ type: 'info', msg })
    }
  }

  const confirm = async (data) => {
    const res = await setLoader(accept(data))
    if (res.type === 'success') {
      setMasters([])
      setSubmitted(submitted + 1)
    }
    setToastMsg(res)
  }

  const fieldsProps = { data: fields, register, control, errors, defaultValues }
  const selectProps = { control, data: hours, name: 'hours', defaultValue: defaultValues.hours }

  return (
    <>
      <Loader loading={loading} />
      <Paper className={container}>
        <Typography align='center'>
          Enter your details, city, and size of the watch that needs to be repaired.
        </Typography>
        <Typography align='center'> Select a comfy date and time and we will find free masters for you. </Typography>
        <form onSubmit={handleSubmit((data) => findFreeMasters(data))} className={form} key={submitted}>
          <Box className={wrap}>
            <FieldsGenerator {...fieldsProps} />
            <DatePicker control={control} />
            <SelectField {...selectProps} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    process: (data) => dispatch(processData(data)),
    accept: (data) => dispatch(acceptOrder(data)),
  }
}

export default compose(connect(null, mapDispatchToProps))(SearchForm)
