const adminPath = '/table'

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

const update = async (data, subj) => {
  const id = data.id
  const res = await fetch(`${adminPath}/${subj}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const remove = async (id, subj) => {
  const res = await fetch(`${adminPath}/${subj}/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

const add = async (data, subj) => {
  const res = await fetch(`${adminPath}/${subj}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const get = async (subj, data) => {
  const { limit, order, orderby, offset } = data
  const res = await fetch(`${adminPath}/${subj}/${limit}/${offset}/${orderby}/${order}`)
  return res.json()
}

const getKeys = async (subj) => {
  const res = await fetch(`${adminPath}/${subj}/foreignKeys`)
  return res.json()
}

const getFiltered = async ({ master_id, order_id, date }, subj) => {
  const res = await fetch(`${adminPath}/${subj}/filtered/?date=${date}&master_id=${master_id}&order_id=${order_id}`)
  return res.json()
}

export const updateItem = async (data, subj) => wrapTryCatch(changeEventErr(update(data, subj)))
export const removeItem = async (data, subj) => wrapTryCatch(changeEventErr(remove(data, subj)))
export const addItem = async (data, subj) => wrapTryCatch(changeEventErr(add(data, subj)))
export const getItems = async (subj, data) => wrapTryCatch(get(subj, data))
export const getForeignKeys = async (subj) => wrapTryCatch(getKeys(subj))
export const getFilteredOrders = async (data, subj) => wrapTryCatch(getFiltered(data, subj))
