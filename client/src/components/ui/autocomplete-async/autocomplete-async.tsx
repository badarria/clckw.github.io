import React, { ChangeEvent, useCallback, useState } from 'react'
import { CircularProgress, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { useStyles } from './styles'
import { UserByText } from '../../containers/admin/types'
import { findMastersByText, findCustomersByText } from '../../../services/admin/orders'
import debounce from 'lodash/debounce'
import { useEffect } from 'react'

type Props = {
  data: any[]
  control: Control
  name: string
  keyToSelect: string
  errors: FieldErrors
  label?: string
}

export default (props: Props) => {
  const { data, control, name, keyToSelect, errors = {}, label = name } = props
  const { input, root, labels, error } = useStyles()
  const defaultValue = data[0] || { id: 0, [keyToSelect]: '' }
  const [options, setOptions] = useState<UserByText[]>([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const find = async (value: string) => {
    setLoading(true)
    const masters = name === 'master' ? await findMastersByText(value) : await findCustomersByText(value)
    if ('type' in masters) return
    setOptions(masters)
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

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, ref }) => (
        <Autocomplete
          className={root}
          disableClearable
          defaultValue={defaultValue}
          filterOptions={(data) => data.filter((opt) => opt[keyToSelect])}
          getOptionLabel={(option) => option[keyToSelect]}
          options={options}
          classes={{ inputRoot: input }}
          getOptionSelected={(option, value) => option[keyToSelect] === value[keyToSelect]}
          onChange={(event, newValue) => onChange(newValue)}
          loading={loading}
          open={open}
          onOpen={handleOpen}
          onClose={handleOpen}
          renderInput={(params) => (
            <TextField
              onChange={handleChange}
              {...params}
              InputLabelProps={{ className: labels }}
              label={label}
              value={value}
              required
              inputRef={ref}
              helperText={errors[name]?.message || ''}
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
      )}
    />
  )
}
