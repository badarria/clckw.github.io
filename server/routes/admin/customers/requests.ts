import { NextFunction, Request, Response } from 'express'
import { customerSchema, deleteSchema, pagingSchema } from '../../../validation'
import { Customer } from '../../../db/models'

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await customerSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, email, id } = validData
    const result = await Customer.update({ name, surname, email }, { where: { id } }).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'Customer was updated' : 'Customer not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await pagingSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { orderby, order, limit, offset } = validData
    const params: any = { order: [[orderby, order]] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const list = await Customer.findAndCountAll(params).catch((err) => next(err))

    return list && res.json({ items: list.rows, count: list.count })
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await Customer.destroy({ where: { id } }).catch((err) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'Customer was deleted' : 'Customer not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await customerSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, email } = validData
    const result = await Customer.create({ name, surname, email }).catch((err) => next(err))
    return result && res.json({ type: 'success', msg: 'Customer was added' })
  }
}

export { add, remove, getList, update }
