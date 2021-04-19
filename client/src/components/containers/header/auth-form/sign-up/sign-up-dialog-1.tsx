import React, { useEffect, useState, ReactElement } from 'react'
import { DialogContent, DialogTitle, Button, Box, FormGroup, InputLabel } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Typography } from '@material-ui/core'
import { reg1FormSchema } from '../../../../../services/home/validation/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStyles } from '../styles'
import { AutocompleteField, InputField, Loader } from 'components/ui'
import { getInit } from 'services/home/api'
import { ControlledCheckbox } from '../../components'
import { LocalSignUp } from '../../types'
const initCity = { id: 0, name: '' }

type Props = {
  change: () => void
  msg: string
  localSignUp: (data: LocalSignUp) => void
  googleBtn: ReactElement
}

const SignUpDialog1 = ({ change, msg, localSignUp, googleBtn }: Props) => {
  const {
    title,
    form,
    content,
    checkMasterBox,
    btnWrap,
    btn,
    wrap,
    checkBox,
    inputWrap,
    inputGrow,
    msgBox,
  } = useStyles()
  const [disabled, setDisabled] = useState(true)
  const [asMaster, setMaster] = useState(false)
  const [cities, setCities] = useState([initCity])
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, errors, control, watch } = useForm({
    resolver: yupResolver(reg1FormSchema),
    defaultValues: {
      city: cities[0],
      password: '',
      email: '',
      name: '',
      surname: '',
      confirmPassword: '',
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

  const inputProps = { register, control, errors }
  const cityFieldProps = { data: cities, control, name: 'city', keyToSelect: 'name', errors }

  return (
    <>
      <Loader loading={loading} />
      <DialogTitle id='form-dialog' className={title}></DialogTitle>
      <DialogContent className={content}>
        <form onSubmit={handleSubmit(localSignUp)} className={form} autoComplete='off'>
          <Box className={wrap}>
            <Box className={inputWrap}>
              <InputField label='name' {...inputProps} />
              <InputField label='password' {...inputProps} type='password' />
              <InputField label='email' {...inputProps} />
            </Box>
            <Box className={inputWrap}>
              <InputField label='surname' {...inputProps} />
              <Box className={inputGrow}>
                <InputField label='confirm Password' {...inputProps} name='confirmPassword' type='password' />
              </Box>
              {asMaster && <AutocompleteField {...cityFieldProps} />}
            </Box>
          </Box>
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
            {googleBtn}
            <Button size='small' onClick={change} className={btn}>
              I have an account
            </Button>
          </Box>
        </form>
      </DialogContent>
    </>
  )
}

export default SignUpDialog1
