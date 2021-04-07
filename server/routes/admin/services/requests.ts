import { NextFunction, Request, Response } from 'express'
import { deleteSchema, pagingSchema, serviceSchema } from '../../../validation'
import { Service } from '../../../db/models'

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await serviceSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, time, id, price } = validData
    const result = await Service.update({ name, time, price }, { where: { id } }).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'Service  was updated' : 'Service not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
  let validData = await pagingSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { orderby, order, limit, offset } = validData
    const params: any = { order: [[orderby, order]] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const list = await Service.findAndCountAll(params).catch((err) => next(err))

    return list && res.json({ items: list.rows, count: list.count })
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await Service.destroy({ where: { id } }).catch((err) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'Service was removed from database' : 'Service not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await serviceSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, time, price } = validData
    const result = await Service.create({ name, time, price }).catch((err) => next(err))

    return result && res.json({ type: 'success', msg: 'Service was added' })
  }
}

export { add, remove, getList, update }
