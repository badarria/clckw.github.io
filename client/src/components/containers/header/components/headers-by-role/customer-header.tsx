import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'
import { useStyles } from './styles'
import { LogoBtn, LogoutBtn, BlogBtn } from '..'
import LangSwitcher from '../lang-switcher/lang-switcher'
import { useTranslation } from 'react-i18next'

type Props = { logout: () => void }

export default ({ logout }: Props) => {
  const { btns } = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <LogoBtn />
      <BlogBtn />
      <Box className={btns}>
        <Button color='inherit' component={Link} to={'/customer'}>
          {t('header.customer')}
        </Button>
        <LogoutBtn logout={logout} />
        <LangSwitcher />
      </Box>
    </>
  )
}
