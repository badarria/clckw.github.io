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

const update = async (subj, data) => {
  const { id } = data
  const res = await fetch(`${adminPath}/${subj}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const remove = async (subj, id, token) => {
  const res = await fetch(`${adminPath}/${subj}/${token}/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

const add = async (subj, data) => {
  const res = await fetch(`${adminPath}/${subj}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const get = async (subj, paging, token) => {
  const { limit, order, orderby, offset } = paging
  const res = await fetch(`${adminPath}/${subj}/${token}/${limit}/${offset}/${orderby}/${order}`)
  return res.json()
}

const getKeys = async (subj, token) => {
  const res = await fetch(`${adminPath}/${subj}/foreignKeys/${token}`)
  return res.json()
}

const getFiltered = async ({ master_id, order_id, date }, subj) => {
  const res = await fetch(`${adminPath}/${subj}/filtered/?date=${date}&master_id=${master_id}&order_id=${order_id}`)
  return res.json()
}

export const updateItem = async (subj, data) => wrapTryCatch(changeEventErr(update(subj, data)))
export const removeItem = async (subj, data, token) => wrapTryCatch(changeEventErr(remove(subj, data, token)))
export const addItem = async (subj, data) => wrapTryCatch(changeEventErr(add(subj, data)))
export const getItems = async (subj, data, token) => wrapTryCatch(get(subj, data, token))
export const getForeignKeys = async (subj, token) => wrapTryCatch(getKeys(subj, token))
export const getFilteredOrders = async (data, subj) => wrapTryCatch(getFiltered(data, subj))
