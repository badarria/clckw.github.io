import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AutocompleteField, InputField, Loader, TableForm } from '../components'
import { yupResolver } from '@hookform/resolvers/yup'
import { masters } from '../../../../services/admin/validation/schema'
import { Master } from '../../../../types'
import { getMastersKeys } from 'services/admin/masters'
import { State, newMaster } from '../../admin/types'

type Props = {
  cancel: () => void
  accept: (data: newMaster) => void
  data: Master
  editState: State
}

export const MastersForm = ({ data, cancel, accept, editState }: Props) => {
  const { id, name, surname, ci, email } = data
  const [keys, setKeys] = useState([ci])
  const [loading, setLoading] = useState(false)
  const defaultValues = { id, name, surname, city: keys[0], password: '', email }
  const labels = Object.keys({ id, name, surname, email, password: '' })

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
    submit: handleSubmit((data) => accept({ ...data, city: `${data.city.id}` })),
    reset: () => {
      cancel()
      reset()
    },
    editState,
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
          <InputField key={inx} register={register} label={label} errors={errors} />
        ))}
        <AutocompleteField control={control} name='city' data={keys} keyToSelect='name' errors={errors} />
      </TableForm>
    </>
  )
}
