const homePath = '/home'

const wrapTryCatch = async (tryFunc) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' }
  }
}

const getMasters = async ({ city, begin, end }) => {
  const url = `${homePath}/find`
  const params = `?city=${city}&begin=${begin}&end=${end}`
  const res = await fetch(`${url}${params}`)
  return res.json()
}

const upsertCustomer = async (data) => {
  const res = await fetch(`${homePath}/customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const login = async (data) => {
  const res = await fetch(`${homePath}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const add = async (data) => {
  const res = await fetch(`${homePath}/newOrder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const sendFirstLetter = async (data) => {
  const res = await fetch(`${homePath}/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const sendSecondLetter = async (data) => {
  const res = await fetch(`${homePath}/rating`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const check = async (token) => {
  const res = await fetch(`${homePath}/verify/${token}`)
  return res.json()
}

const init = async () => {
  const res = await fetch(`${homePath}/init`)
  return res.json()
}

export const getFreeMasters = async (data) => wrapTryCatch(getMasters(data))
export const getCustomer = async (data) => wrapTryCatch(upsertCustomer(data))
export const loginUser = async (data) => wrapTryCatch(login(data))
export const addNewOrder = async (data) => wrapTryCatch(add(data))
export const sendConfirmLetter = async (data) => wrapTryCatch(sendFirstLetter(data))
export const sendRatingLetter = async (data) => wrapTryCatch(sendSecondLetter(data))
export const checkAuth = async (token) => wrapTryCatch(check(token))
export const getInit = async () => wrapTryCatch(init())
