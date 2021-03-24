import { NextFunction, Request, Response } from 'express'
import { customerSchema, deleteSchema, pagingSchema } from '../../../validation'
import { Customer, User } from '../../../db/models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await customerSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, email, id, password } = validData
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const token = v4()
    const result = await Customer.update({ name, surname }, { where: { id }, returning: true }).catch((err) =>
      next(err)
    )
    const userId = result && result[1][0].user_id
    if (result && userId) {
      const updUser = await User.update({ pass: bcPass, salt, email }, { where: { id: userId } }).catch((err) =>
        next(err)
      )
      const msg = result[0] ? 'Customer was updated' : 'Customer not found'
      const type = result[0] ? 'success' : 'warning'
      return updUser && res.json({ type, msg })
    } else if (result && !userId) {
      const newUser = await User.create({ salt, pass: bcPass, email, token, role: 'customer' }).catch((err) =>
        next(err)
      )
      const userId = newUser && newUser.id
      const updCustomer =
        userId && (await Customer.update({ user_id: userId }, { where: { id } }).catch((err) => next(err)))
      const msg = result[0] ? 'Customer  was updated' : 'Customer not found'
      const type = result[0] ? 'success' : 'warning'
      return updCustomer && res.json({ type, msg })
    } else throw new Error("Customer wasn't updated")

    // if (result && userId) {
    //   const updUser = await User.update({ pass: bcPass, salt, email }, { where: { id: userId } }).catch((err) =>
    //     next(err)
    //   )
    //   const msg = result[0] ? 'Master  was updated' : 'Master not found'
    //   const type = result[0] ? 'success' : 'warning'
    //   return updUser && res.json({ type, msg })
    // } else if (result && !userId) {
    //   const newUser = await User.create({ salt, pass: bcPass, email, token, role: 'master' }).catch((err) => next(err))
    //   const userId = newUser && newUser.id
    //   const updMaster =
    //     userId && (await Master.update({ user_id: userId }, { where: { id } }).catch((err) => next(err)))
    //   const msg = result[0] ? 'Master  was updated' : 'Master not found'
    //   const type = result[0] ? 'success' : 'warning'
    //   return updMaster && res.json({ type, msg })
    // } else throw new Error("Master wasn't updated")
  }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await pagingSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { orderby, order, limit, offset } = validData
    let ord: any = [orderby, order]
    if (orderby === 'email') {
      ord = [{ model: User, as: 'user' }, 'email', order]
    }
    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const list = await Customer.findAndCountAll({ ...params, include: { model: User, as: 'user' } }).catch((err) =>
      next(err)
    )

    return list && res.json({ items: list.rows, count: list.count })
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const customer = await Customer.findOne({ where: { id } }).catch((err) => next(err))
    if (customer) {
      const userId = customer.user_id
      const removeUser = await User.destroy({ where: { id: userId } }).catch((err) => next(err))
      const result = !removeUser && (await Customer.destroy({ where: { id } }).catch((err) => next(err)))
      if (removeUser || result) {
        const msg = removeUser || result ? 'Customer was removed from database' : 'Customer not found'
        const type = removeUser || result ? 'success' : 'warning'
        return res.json({ type, msg })
      }
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await customerSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, email, password } = validData
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const token = v4()
    const newUser = await User.create({ role: 'customer', pass: bcPass, email, salt, token }).catch((err) => next(err))

    const result = newUser && (await Customer.create({ name, surname, user_id: newUser.id }).catch((err) => next(err)))
    return result && newUser && res.json({ type: 'success', msg: 'Customer was added' })
  }
}

export { add, remove, getList, update }
