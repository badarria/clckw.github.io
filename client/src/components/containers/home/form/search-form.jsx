import React, { useEffect } from 'react'
import { Paper, Box, Button, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormDataState } from '../../../../store/selectors/state-selectors'
import { changeHours, findMasters, getInitState, processData } from '../../../../services/home'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../services/home/validation/schema'
import { useStyles } from './styles'
import { getBeginEnd } from '../../../../services/common/utils/datetime-func'
import { DatePicker, FieldsGenerator, SelectField } from '../../../ui'

const SearchForm = (props) => {
  const { container, form, wrap, btn } = useStyles()
  const {
    data: { fields, date, hours },
    initState,
    changeHours,
    findMasters,
    processData,
  } = props

  useEffect(() => {
    if (fields.city === '' && fields.service === '') {
      initState()
    }
  }, [])

  const defaultValues = {
    name: '',
    surname: '',
    email: '',
    city: { id: null, name: '' },
    service: { id: null, name: '', time: '' },
    date: date,
    hours: '',
  }

  const { register, handleSubmit, control, watch, reset, errors } = useForm({
    resolver: yupResolver(schema.form),
    defaultValues,
  })
  const service = watch('service')

  useEffect(() => {
    if (service?.time) {
      changeHours(service.time)
    }
  }, [service])

  const fieldsProps = {
    data: fields,
    register,
    control,
    errors,
    defaultValues,
  }

  const submit = async (data) => {
    const { name, surname, email, service, city, date, hours } = data
    const { begin, end } = getBeginEnd(date, hours, service.time)
    const res = await findMasters({ city: city.id, begin, end })

    if (res) {
      processData({
        name,
        email,
        surname,
        service,
        city: city.name,
        begin,
        end,
      })
    }
  }

  return (
    <Paper className={container}>
      <Typography align='center'>Enter your details, city, and size of the watch that needs to be repaired.</Typography>
      <Typography align='center'> Select a comfy date and time and we will find free masters for you. </Typography>
      <form onSubmit={handleSubmit((data) => submit(data))} className={form} onReset={() => reset(defaultValues)}>
        <Box className={wrap}>
          <FieldsGenerator {...fieldsProps} />
          <DatePicker control={control} />
          <SelectField control={control} data={hours || []} name='hours' />
        </Box>
        <Box className={wrap}>
          <Button type='submit' variant='contained' color='primary' className={btn}>
            Find Master
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  data: getFormDataState(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    initState: () => dispatch(getInitState),
    changeHours: (service_time) => dispatch(changeHours(service_time)),
    findMasters: (data) => dispatch(findMasters(data)),
    processData: (data) => dispatch(processData(data)),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(SearchForm)
