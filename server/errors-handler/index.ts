import { Response, Request, NextFunction } from 'express'
import { ValidationError } from 'yup'

export const errorsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(500).send({ type: 'error', msg: 'Data is incorrect', detail: err.errors[0] })
    return
  }
  if (err.name === 'JsonWebTokenError') {
    res.status(500).send({ type: 'error', msg: 'Incorrect token' })
    return
  }
  if (err.name.match('Sequelize')) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      res
        .status(500)
        .send({ type: 'error', msg: 'Constraint error. This item is related with others', detail: err.name })
      return
    }
    res.status(500).send({ type: 'error', msg: 'Database error', detail: err.name })
    return
  }
  if (err.name === 'PayloadTooLargeError') {
    res.status(500).send({ type: 'error', msg: 'Bad request. It is too large' })
    return
  }
  if (err.name.match('Stripe')) {
    return res.status(500).send({ type: 'error', msg: 'Something went wrong and payment not accept' })
  }

  res.status(500).send({ type: 'error', msg: err.message || 'something went wrong' })
}
