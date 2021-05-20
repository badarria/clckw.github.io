import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'

export default () => {
  const { t } = useTranslation()
  const { btns } = useStyles()

  return (
    <Button color='inherit' component={Link} to={'/blog'} className={btns}>
      {t('header.blog')}
    </Button>
  )
}
