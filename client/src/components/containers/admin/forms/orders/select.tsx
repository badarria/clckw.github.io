import React, { ChangeEvent } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useStyles } from './styles'
import { SelectFilterProps } from '../../types'

export default (props: SelectFilterProps) => {
  const { selected, changeOptions, data, label, keyWord = 'name' } = props
  const { select, selectLabel, fields } = useStyles()

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as number[]
    changeOptions(values)
  }

  return (
    <FormControl className={fields}>
      <InputLabel className={selectLabel}>{label}</InputLabel>
      <Select multiple value={selected} onChange={handleChange} className={select}>
        {data.length ? (
          data.map((item, inx) => {
            const newItem: any = { ...item }

            return (
              <MenuItem key={inx} value={item.id}>
                {newItem[keyWord]}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem disabled>There is no options</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
