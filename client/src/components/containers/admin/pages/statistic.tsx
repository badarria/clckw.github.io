import React, { useEffect, useState } from 'react'
import { Loader } from '../components'
import { Response } from '../../../../types'

export default () => {
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast: Response) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  return (
    <>
      <Loader loading={loading} />
    </>
  )
}
