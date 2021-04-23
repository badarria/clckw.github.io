import { Response } from '../../../types'

const adminPath = '/admin/post'
const getToken = () => localStorage.getItem('token') || ''

type Post = { content: string; title: string; description: string; preview: string | ArrayBuffer | null }

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}

const download = async (data: { file: string }): Promise<string> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

const save = async (data: Post): Promise<Response> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/savePost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const downloadFile = async (data: { file: string }) => await wrapTryCatch(download(data))
export const savePost = async (data: Post) => await wrapTryCatch(save(data))
