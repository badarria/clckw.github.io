import { NextFunction, Request, Response } from 'express'
import { Customer } from '../../../../db/models'
import * as yup from 'yup'
import { Op } from 'sequelize'

const schema = yup.object().shape({
  str: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  let validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { str } = validData

  let list = await Customer.findAll({
    attributes: ['name', 'surname', 'fullName', 'id'],
    where: { [Op.or]: [{ name: { [Op.iLike]: `%${str}%` } }, { surname: { [Op.iLike]: `%${str}%` } }] },
    limit: 20,
  }).catch((err: Error) => next(err))
  if (!list) return

  return list && res.json(list)
}
