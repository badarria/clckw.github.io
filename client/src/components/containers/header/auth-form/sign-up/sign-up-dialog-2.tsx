import React, { useEffect, useState } from 'react'
import { DialogContent, DialogTitle, Button, Box, FormGroup, InputLabel } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Typography } from '@material-ui/core'
import { reg2FormSchema } from '../../../../../services/home/validation/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStyles } from '../styles'
import { AutocompleteField, Loader } from 'components/ui'
import { getInit } from 'services/home/api'
import { ControlledCheckbox } from '../../components'
import { useCallback } from 'react'
import { SignUpGglFormDtT, SignUpDialog2PrT } from '../../types'
const initCity = { id: 0, name: '' }

const SignUpDialog2 = ({ msg, change, submit }: SignUpDialog2PrT) => {
  const { title, form, content, checkMasterBox, btnWrap, btn, wrap, checkBox, inputWrap, msgBox } = useStyles()
  const [cities, setCities] = useState([initCity])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [asMaster, setMaster] = useState(false)

  const { handleSubmit, errors, control, watch } = useForm({
    resolver: yupResolver(reg2FormSchema),
    defaultValues: {
      city: cities[0],
      agree: false,
      master: false,
    },
  })

  const isAgree = watch(['agree']).agree
  const isMaster = watch(['master']).master

  useEffect(() => {
    setDisabled(() => !isAgree)
  }, [isAgree])

  useEffect(() => {
    if (isMaster && !cities[0].id) {
      const getCities = async () => {
        setLoading(true)
        const res = await getInit()
        if (res && 'city' in res) {
          setCities(res.city)
        }
        setLoading(false)
      }
      getCities()
    }
    setMaster(isMaster)
  }, [isMaster])

  const submitForm = useCallback((data: SignUpGglFormDtT) => {
    const newData = { ...data }
    if (!data.master) newData.city = initCity

    submit(data)
  }, [])

  const cityFieldProps = { data: cities, control, name: 'city', keyToSelect: 'name', errors }

  return (
    <>
      <Loader loading={loading} />
      <DialogTitle id='form-dialog' className={title}></DialogTitle>
      <DialogContent className={content}>
        <form onSubmit={handleSubmit(submitForm)} className={form} autoComplete='off'>
          <FormGroup>
            <InputLabel className={checkBox}>
              <ControlledCheckbox control={control} name='agree' />
              <span> I agree with everything</span>
            </InputLabel>
          </FormGroup>
          <FormGroup className={checkMasterBox}>
            <InputLabel className={checkBox}>
              <ControlledCheckbox control={control} name='master' />
              <span> Register as a master</span>
            </InputLabel>
          </FormGroup>
          <Box className={wrap}>
            <Box className={inputWrap}>{asMaster && <AutocompleteField {...cityFieldProps} />}</Box>
          </Box>
          <Box className={msgBox}>
            {msg ? (
              <Typography color='secondary' variant='subtitle2'>
                {msg}
              </Typography>
            ) : null}
          </Box>
          <Box className={btnWrap}>
            <Button type='submit' color='primary' variant='contained' className={btn} disabled={disabled}>
              Ok
            </Button>
            <Button size='small' onClick={change} className={btn}>
              I have an account
            </Button>
          </Box>
        </form>
      </DialogContent>
    </>
  )
}

export default SignUpDialog2
