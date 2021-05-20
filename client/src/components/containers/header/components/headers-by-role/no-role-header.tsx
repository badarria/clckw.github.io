import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'
import SignForm from '../../auth-form/sign-form'
import { useStyles } from './styles'
import { LogoBtn, BlogBtn } from '..'
import LangSwitcher from '../lang-switcher/lang-switcher'

export default () => {
  const { btns } = useStyles()

  return (
    <>
      <LogoBtn />
      <BlogBtn />
      <Box className={btns}>
        <SignForm />
        <LangSwitcher />
      </Box>
    </>
  )
}
