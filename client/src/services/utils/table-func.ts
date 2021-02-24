export const getServiceTime = () => {
  let res = []
  for (let i = 1; i < 9; i += 1) {
    res.push({ id: i, name: `${i}h` })
  }
  return res
}

export const findObj = (id: number, keys: any, defaultValue: any) => {
  for (let item of keys) {
    if (item.id === id) return item
  }
  return defaultValue
}
