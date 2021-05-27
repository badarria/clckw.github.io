import React, { ChangeEvent, MutableRefObject, useCallback, useState } from 'react'
import { CircularProgress, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FieldErrors } from 'react-hook-form'
import { useStyles } from './styles'
import { UserByText } from '../../containers/admin/types'
import { Response } from '../../../types'
import debounce from 'lodash/debounce'
import { useEffect } from 'react'

type Props = {
  data: any[]
  onChange?: (e: any[]) => void
  name: string
  keyToSelect: string
  errors: FieldErrors
  ref?: MutableRefObject<any>
  label?: string
  getData: (data: string) => Promise<UserByText[] | Response>
  controlled?: boolean
}

export default (props: Props) => {
  const { data, onChange, name, keyToSelect, errors = {}, label = name, getData, ref, controlled = false } = props
  const { input, root, labels, error } = useStyles()
  const defaultValue = data[0] || { id: 0, [keyToSelect]: '' }
  const [options, setOptions] = useState<UserByText[]>([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const find = async (value: string) => {
    setLoading(true)
    const data = await getData(value)
    if ('type' in data) return
    setOptions(data)
    setLoading(false)
  }

  const debouncedSave = useCallback(
    debounce((value: string) => find(value), 2000),
    []
  )
  const handleOpen = () => setOpen(!open)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
    debouncedSave(value)
  }

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const commonProps = onChange ? { onChange: (e: ChangeEvent<{}>, value: any) => onChange(value) } : {}
  const fieldProps = controlled ? { inputRef: ref, helperText: errors[name]?.message || '' } : {}

  return (
    <Autocomplete
      className={root}
      disableClearable
      defaultValue={defaultValue}
      filterOptions={(data) => data.filter((opt) => opt[keyToSelect])}
      getOptionLabel={(option) => option[keyToSelect]}
      options={options}
      classes={{ inputRoot: input }}
      getOptionSelected={(option, value) => option[keyToSelect] === value[keyToSelect]}
      loading={loading}
      open={open}
      onOpen={handleOpen}
      onClose={handleOpen}
      {...commonProps}
      renderInput={(params) => (
        <TextField
          onChange={handleChange}
          {...params}
          {...fieldProps}
          InputLabelProps={{ className: labels }}
          label={label}
          value={value}
          required
          FormHelperTextProps={{ className: error }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}
