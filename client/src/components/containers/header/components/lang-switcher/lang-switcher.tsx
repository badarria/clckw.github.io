import { Select, MenuItem, Box } from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styles'

export default () => {
  const { i18n } = useTranslation()
  const { items, icon, select, selectBox } = useStyles()

  const setLang = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value
    i18n.changeLanguage(value as string)
  }
  const langs = ['en', 'ua', 'ru']

  return (
    <Box className={selectBox}>
      <Select inputProps={{ classes: { icon } }} defaultValue={langs[0]} className={select} onChange={setLang}>
        {langs.map((lang, inx) => (
          <MenuItem key={inx} value={lang} className={items}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
