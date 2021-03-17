import { deleteSchema, masterSchema, pagingSchema } from '../../../validation'
import { NextFunction, Request, Response } from 'express'
import { Master, City, Order } from '../../../db/models'

const getKeys = async (req: Request, res: Response, next: NextFunction) => {
  const city = await City.findAll().catch((err) => next(err))
  return city && res.json(city)
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await masterSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, city, id } = validData
    const result = await Master.update(
      { name, surname, city_id: city },
      { where: { id }, returning: true }
    ).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'Master was updated' : 'Master not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
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

    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const count = await Master.count().catch((err) => next(err))
    const items = await Master.findAll({
      attributes: ['id', 'name', 'surname', 'city', 'rating', 'city_id'],
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
      ],
    }).catch((err) => next(err))

    return count && items && res.json({ items, count })
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await Master.destroy({ where: { id } }).catch((err) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'Master was deleted' : 'Master not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await masterSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, city } = validData
    const result = await Master.create({ name, surname, city_id: city }).catch((err) => next(err))
    return result && res.json({ type: 'success', msg: 'Master was added' })
  }
}

export { update, add, remove, getList, getKeys }
