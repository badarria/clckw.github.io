import { Customer, Master, User } from '../../../../db/models'

export const getUserByRole = async (role: string, token: string, id: number) => {
  let userId = 0,
    name = 'admin'
  if (role === 'master') {
    const master = await Master.findOne({ include: { model: User, where: { id } } }).catch((err) => err)
    master && (userId = master.id) && (name = master.fullName)
  }
  if (role === 'customer') {
    const customer = await Customer.findOne({ include: { model: User, where: { id } } }).catch((err) => err)
    customer && (userId = customer.id) && (name = customer.fullName)
  }
  return { id: userId, role, token, name }
}
