import { NextFunction, Request, Response } from 'express'
import { City } from '../../../db/models'
import { citySchema, pagingSchema, deleteSchema } from '../../../validation'

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await citySchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, id } = validData
    const result = await City.update({ name }, { where: { id } }).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'City was updated' : 'City not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await pagingSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { limit, order, offset, orderby } = validData
    const params: any = { order: [[orderby, order]] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const list = await City.findAndCountAll(params).catch((err) => next(err))
    return list && res.json({ items: list.rows, count: list.count })
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await City.destroy({ where: { id } }).catch((err) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'City was deleted' : 'City not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await citySchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name } = validData
    const result = await City.create({ name }).catch((err) => next(err))
    return result && res.json({ type: 'success', msg: 'City was added' })
  }
}

export { add, remove, getList, update }
