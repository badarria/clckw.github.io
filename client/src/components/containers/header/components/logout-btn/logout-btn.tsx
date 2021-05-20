import React from 'react'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

type Props = { logout: () => void }

export default ({ logout }: Props) => {
  const { t } = useTranslation()

  return (
    <Button color='inherit' onClick={logout}>
      {t('header.logout')}
    </Button>
  )
}
