import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AutocompleteField, InputField, Loader, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { masters } from '../../../../services/admin/validation/schema'
import { MastersFormProps } from 'types'
import { getMastersKeys } from 'services/admin/masters'

export const MastersForm = ({ data, cancel, accept }: MastersFormProps) => {
  console.log(data, 'masters')
  const { id, name, surname, ci } = data
  const [keys, setKeys] = useState([ci])
  const [loading, setLoading] = useState(false)
  const defaultValues: any = { id, name, surname, city: keys[0] }
  const labels = Object.keys({ id, name, surname })

  const { register, handleSubmit, control, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(masters),
  })

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const formProps = {
    submit: handleSubmit((data) => {
      const { id, name, surname, city } = data
      return accept({ id, name, surname, city: city.id })
    }),
    reset: () => {
      cancel()
      reset()
    },
  }

  useEffect(() => {
    const getKeys = async () => {
      const key = await setLoader(getMastersKeys())
      if (Array.isArray(key)) {
        setKeys(key)
      }
    }
    getKeys()
  }, [])

  return (
    <>
      <Loader loading={loading} />
      <TableForm {...formProps}>
        {labels.map((label, inx) => (
          <InputField key={inx} defaultValue={defaultValues[label]} register={register} label={label} errors={errors} />
        ))}
        <AutocompleteField control={control} name='city' data={keys} keyToSelect='name' errors={errors} />
      </TableForm>
    </>
  )
}
