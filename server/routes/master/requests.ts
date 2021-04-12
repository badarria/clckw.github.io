import { Customer, Master, Order, Photo, Service, User } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { usersOrderSchema, orderIdSchema, secondMailSchema } from '../../validation'
import { createMail, jwtGenerator, cloudinary } from '../../utils'
import { config } from '../../../config'
import pdf from 'html-pdf'
import pdfTemplate from './pdfTemplate'
import fs from 'fs'

const url = config.mailing.baseUrl

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await usersOrderSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id, orderby, order, limit, offset } = validData

    let ord: any = [orderby, order]
    if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
    if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
    if (orderby === 'price') ord = [{ model: Service, as: 's' }, 'price', order]
    if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
    if (orderby === 'finish') ord = ['finishat', order]

    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }

    const list = await Order.findAll({
      ...params,
      attributes: ['id', 'date', 'begin', 'finish', 'rating', 'beginat', 'finishat', 'completed', 'price'],
      include: [
        {
          model: Customer,
          as: 'c',
          attributes: ['name', 'surname', 'fullName', 'email'],
          include: [{ model: User, as: 'user' }],
        },
        { model: Master, as: 'm', attributes: ['id', 'name', 'surname', 'fullName'], where: { id } },
        { model: Service, as: 's', attributes: [['name', 'service'], 'price'] },
        { model: Photo, as: 'photos' },
      ],
    }).catch((err) => next(err))
    list && res.json(list)
  }
}

export const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderIdSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await Order.update({ completed: true }, { where: { id } }).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'Order  was updated' : 'Order not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

export const downloadPdf = async (req: Request, res: Response, next: NextFunction) => {
  // const { id } = req.params
  // const details = await Order.scope('allIncl')
  //   .findOne({ where: { id }, include: [] })
  //   .catch((err) => next(err))
  // if (details) {
  //   const { service, master, date, price, m, c } = details
  //   const customer = { ...c }
  //   const mastrer = { ...m }
  // }
  pdf.create(pdfTemplate()).toFile('res.pdf', (err) => {
    if (err) throw new Error('dfg')
    return Promise.resolve()
  })
}

export const ratingRequestMail = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await secondMailSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { userEmail, name, id } = validData
    const token = jwtGenerator(id)
    const mail = {
      body: {
        title: `Hi, ${name}! We need your feedback`,
        action: {
          instructions: "Please, follow the link below to rate the master's work",
          button: {
            color: '#3f51b5',
            text: 'Go to Rating',
            link: `${url}/orderRate/${token}`,
          },
        },
        outro: 'Thanks for choosing us!',
      },
    }
    const subj = 'We need your feedback!'
    req.body = createMail(mail, userEmail, subj)
    next()
  }
}

export const getPhotos = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const photos = await Photo.findAll({ where: { order_id: id } }).catch((err) => next(err))
  if (photos) {
    const public_ids: string[] = []
    photos.forEach((photo) => {
      const { public_id } = photo
      public_ids.push(public_id)
    })

    const sources = cloudinary.v2.utils.download_zip_url({ public_ids })

    return res.json(sources)
  }
}

// SELECT "Order"."id" FROM "orders" AS "Order" LEFT OUTER JOIN "customers" AS "c" ON "Order"."customer_id" = "c"."id" LEFT OUTER JOIN "users" AS "c->user" ON "c"."user_id" = "c->user"."id" INNER JOIN "masters" AS "m" ON "Order"."master_id" = "m"."id" AND "m"."id" = '2' LEFT OUTER JOIN "services" AS "s" ON "Order"."service_id" = "s"."id" LEFT OUTER JOIN "photos" AS "photos" ON "Order"."id" = "photos"."order_id" ORDER BY "c"."name" ASC LIMIT 10 OFFSET 0;
