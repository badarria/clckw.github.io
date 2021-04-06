import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Button, Box, TextField, FormGroup, InputLabel } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Typography } from '@material-ui/core'
import { registrationForm } from '../../../../services/home/validation/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStyles } from './styles'
import { AutocompleteField, InputField, Loader } from 'components/ui'
import { getInit } from 'services/home/api'
import { ControlledCheckbox } from '.'
import { setDisabled } from 'services/utils/datetime-func'

type DialogProps = {
  msg: string
  open: boolean
  close: () => void
  submit: ({ email, password }: { email: string; password: string }) => void
  changeState: (boolean) => void
}

export const RegistrationDialog = ({ close, submit, open, msg, changeState }: DialogProps) => {
  const { dialog, title, form, content, fields, btnWrap, btn, wrap, checkBox, inputWrap } = useStyles()
  const [cities, setCities] = useState([{ id: 0, name: '' }])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const { register, handleSubmit, errors, control, watch } = useForm({
    resolver: yupResolver(registrationForm),
    defaultValues: {
      city: cities[0],
      password: '',
      email: '',
      name: '',
      surname: '',
      confirmPassword: '',
      agree: false,
    },
  })
  //   console.log(errors)

  const isAgree = watch(['agree']).agree

  useEffect(() => {
    setDisabled(() => !isAgree)
  }, [isAgree])

  useEffect(() => {
    const getCities = async () => {
      setLoading(true)
      const res = await getInit()
      if (res && 'city' in res) {
        setCities(res.city)
      }
      setLoading(false)
    }
    !loading && getCities()
  }, [])
  const inputProps = { register, errors }

  return (
    <>
      <Loader loading={loading} />
      <Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' className={dialog}>
        <DialogTitle id='form-dialog' className={title}>
          Register as a new master
        </DialogTitle>

        <DialogContent className={content}>
          <form onSubmit={handleSubmit(submit)} className={form} autoComplete='off'>
            <Box className={wrap}>
              <Box className={inputWrap}>
                <InputField label='name' {...inputProps} />
                <InputField label='surname' {...inputProps} />
                <InputField label='email' {...inputProps} />
              </Box>
              <Box className={inputWrap}>
                <InputField label='password' {...inputProps} type='password' />
                <InputField label='confirm Password' {...inputProps} name='confirmPassword' type='password' />
                <AutocompleteField {...{ data: cities, control, name: 'city', keyToSelect: 'name', errors }} />
              </Box>
            </Box>
            <FormGroup>
              <InputLabel className={checkBox}>
                <ControlledCheckbox {...{ control, name: 'agree' }} />
                <span> I agree with everything</span>
              </InputLabel>
            </FormGroup>
            {msg ? (
              <Typography color='secondary' variant='subtitle2'>
                {msg}
              </Typography>
            ) : null}

            <Box className={btnWrap}>
              <Button type='submit' color='primary' variant='contained' className={btn} disabled={disabled}>
                Ok
              </Button>
              <Button size='small' onClick={() => changeState(true)} className={btn}>
                I have an account
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}