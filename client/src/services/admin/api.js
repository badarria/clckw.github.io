const adminPath = '/admin'

const wrapTryCatch = async (tryFunc) => {
  try {
    return await tryFunc
  } catch {
    return 'Something went wrong'
  }
}

const changeEventErr = async (changeFunc) => {
  const res = await changeFunc
  if (res.length) {
    return { type: 'success', msg: res }
  } else return { type: 'error', msg: res.msg }
}

const update = async (subj, data, token) => {
  const res = await fetch(`${adminPath}/${subj}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

const remove = async (subj, id, token) => {
  const res = await fetch(`${adminPath}/${subj}/${id}`, {
    method: 'DELETE',
    headers: { token },
  })
  return res.json()
}

const add = async (subj, data, token) => {
  const res = await fetch(`${adminPath}/${subj}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

const get = async (subj, paging, token) => {
  const { limit, order, orderby, offset } = paging
  const res = await fetch(`${adminPath}/${subj}/${limit}/${offset}/${order}/${orderby}`, {
    headers: { token },
  })

  return res.json()
}

const getKeys = async (subj, token) => {
  const res = await fetch(`${adminPath}/${subj}/foreignKeys`, { headers: { token } })
  return res.json()
}

const getFiltered = async (subj, { master_id, order_id, date }) => {
  const res = await fetch(`${adminPath}/${subj}/filtered/${date}/${master_id}/${order_id}`)
  return res.json()
}

export const updateItem = async (subj, data, token) => wrapTryCatch(changeEventErr(update(subj, data, token)))
export const removeItem = async (subj, data, token) => wrapTryCatch(changeEventErr(remove(subj, data, token)))
export const addItem = async (subj, data, token) => wrapTryCatch(changeEventErr(add(subj, data, token)))
export const getItems = async (subj, data, token) => wrapTryCatch(get(subj, data, token))
export const getForeignKeys = async (subj, token) => wrapTryCatch(getKeys(subj, token))
export const getFilteredOrders = async (subj, data) => wrapTryCatch(getFiltered(subj, data))
