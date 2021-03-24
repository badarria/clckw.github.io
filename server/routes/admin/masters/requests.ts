import { deleteSchema, masterSchema, pagingSchema } from '../../../validation'
import { NextFunction, Request, Response } from 'express'
import { Master, City, Order, User } from '../../../db/models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

const getKeys = async (req: Request, res: Response, next: NextFunction) => {
  const city = await City.findAll().catch((err) => next(err))
  return city && res.json(city)
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await masterSchema.validate(req.body).catch((err) => next(err))

  if (validData) {
    const { name, surname, city, id, password, email } = validData
    const result = await Master.update(
      { name, surname, city_id: city },
      { where: { id }, returning: true }
    ).catch((err) => next(err))
    const userId = result && JSON.parse(JSON.stringify(result))[1][0].user_id
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const token = v4()
    if (result && userId) {
      const updUser = await User.update({ pass: bcPass, salt, email }, { where: { id: userId } }).catch((err) =>
        next(err)
      )
      const msg = result[0] ? 'Master  was updated' : 'Master not found'
      const type = result[0] ? 'success' : 'warning'
      return updUser && res.json({ type, msg })
    } else if (result && !userId) {
      const newUser = await User.create({ salt, pass: bcPass, email, token, role: 'master' }).catch((err) => next(err))
      const userId = newUser && newUser.id
      const updMaster =
        userId && (await Master.update({ user_id: userId }, { where: { id } }).catch((err) => next(err)))
      const msg = result[0] ? 'Master  was updated' : 'Master not found'
      const type = result[0] ? 'success' : 'warning'
      return updMaster && res.json({ type, msg })
    } else throw new Error("Master wasn't updated")
  }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
  let validData = await pagingSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { limit, offset, orderby, order } = validData
    let ord: any = [orderby, order]
    if (orderby === 'city') {
      ord = [{ model: City, as: 'ci' }, 'name', order]
    }
    if (orderby === 'rating') ord = ['id', order]
    if (orderby === 'email') {
      ord = [{ model: User, as: 'user' }, 'email', order]
    }
    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }

    const count = await Master.count().catch((err) => next(err))
    const items = await Master.findAll({
      attributes: ['id', 'name', 'surname', 'city', 'rating', 'city_id', 'email'],
      ...params,
      include: [
        {
          model: City,
          as: 'ci',
          attributes: ['name', 'id'],
        },
        {
          model: Order,
          as: 'o',
          attributes: ['rating'],
        },
        { model: User, as: 'user' },
      ],
    }).catch((err) => next(err))

    return count && items && res.json({ items, count })
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const master = await Master.findOne({ where: { id } }).catch((err) => next(err))

    if (master && 'id' in master) {
      const userId = master.user_id

      const removeUser = userId && (await User.destroy({ where: { id: userId } }).catch((err) => next(err)))
      const result = !removeUser && (await Master.destroy({ where: { id } }).catch((err) => next(err)))
      if (result || removeUser) {
        const msg = result || removeUser ? 'Master was removed from database' : 'Master not found'
        const type = result || removeUser ? 'success' : 'warning'
        return res.json({ type, msg })
      }
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await masterSchema.validate(req.body).catch((err) => next(err))

  if (validData) {
    const { name, surname, city, password, email } = validData
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const token = v4()
    const newUser = await User.create({ role: 'master', pass: bcPass, email, salt, token }).catch((err) => next(err))
    const result =
      newUser && (await Master.create({ name, surname, city_id: city, user_id: newUser.id }).catch((err) => next(err)))
    return result && newUser && res.json({ type: 'success', msg: 'Master was added' })
  }
}

export { update, add, remove, getList, getKeys }
