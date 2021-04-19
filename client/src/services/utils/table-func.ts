export const getServiceTime = () => {
  let res: { id: number; name: string }[] = []
  for (let i = 1; i < 9; i += 1) {
    res.push({ id: i, name: `${i}h` })
  }
  return res
}
