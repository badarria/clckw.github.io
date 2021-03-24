import { NextFunction, Request, Response } from 'express'
import { deleteSchema, orderSchema, pagingSchema, searchParamsSchema } from '../../../validation'
import { Order, Customer, Master, Service, City } from '../../../db/models'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { sequelize } from '../../../db'

const update = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { master, customer, service, begin, finish, id } = validData
    console.log(begin, finish)
    const result = await Order.update(
      { master_id: master, customer_id: customer, service_id: service, beginat: begin, finishat: finish },
      { where: { id } }
    ).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'Order  was updated' : 'Order not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const getList = async (req: Request, res: Response, next: NextFunction) => {
  let validData = await pagingSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { orderby, order, limit, offset } = validData
    let ord: any = [orderby, order]
    if (orderby === 'master') ord = [{ model: Master, as: 'm' }, 'name', order]
    if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
    if (orderby === 'city') ord = [{ model: Master, as: 'm' }, { model: City, as: 'ci' }, 'name', order]
    if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
    if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
    if (orderby === 'finish') ord = ['finishat', order]

    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    let list = await Order.scope('allIncl')
      .findAndCountAll(params)
      .catch((err) => next(err))

    return list && res.json({ items: list.rows, count: list.count })
  }
}

const getFiltered = async (req: Request, res: Response, next: NextFunction) => {
  let validData = await searchParamsSchema.validate(req.query).catch((err) => next(err))
  if (validData) {
    const { master_id, date, order_id } = validData
    const filteredOrders = await Order.findAll({
      attributes: ['finishat', 'beginat', 'finish', 'begin'],

      where: {
        [Op.and]: Sequelize.where(Sequelize.cast(Sequelize.col('beginat'), 'date'), date),
        master_id,
        id: { [Op.not]: order_id },
      },
    }).catch((err) => next(err))

    return filteredOrders && res.json(filteredOrders)
  }
}

const getKeys = async (req: Request, res: Response, next: NextFunction) => {
  const master = await Master.findAll().catch((err) => next(err))
  const customer = await Customer.findAll().catch((err) => next(err))
  const service = await Service.findAll({
    attributes: ['id', ['name', 'service'], ['time', 'service_time']],
  }).catch((err) => next(err))

  return master && customer && service && res.json({ master, customer, service })
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await deleteSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await Order.destroy({ where: { id } }).catch((err) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'Order was removed from database' : 'Order not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

const add = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { master, customer, service, begin, finish } = validData
    const result = await Order.create({
      master_id: master,
      customer_id: customer,
      service_id: service,
      beginat: begin,
      finishat: finish,
    }).catch((err) => next(err))
    return result && res.json({ type: 'success', msg: 'Order was added' })
  }
}

export { remove, add, getKeys, getFiltered, getList, update }
