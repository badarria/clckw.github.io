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
    console.log(err)
    res.status(500).send({ type: 'error', msg: 'Database error', detail: err.name })
    return
  }
  // console.error(err, 'inda ErrorHandler')
  res.status(500).send({ type: 'error', msg: err.message || 'something went wrong' })
}
