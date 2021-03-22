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

;[
  {
    begin: '18:00',
    finish: '19:00',
    date: 'Thu 11/03/2021',
    id: 40,
    rating: null,
    beginat: '2021-03-11T18:00:00.000Z',
    finishat: '2021-03-11T19:00:00.000Z',
    completed: false,
    c: { fullName: 'ftyjcdty dtydyj', name: 'ftyjcdty', surname: 'dtydyj', email: 'dyjyrsyj@cdtykj.rrt' },
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Small clock' },
  },
  {
    begin: '13:00',
    finish: '15:00',
    date: 'Mon 08/03/2021',
    id: 39,
    rating: null,
    beginat: '2021-03-08T13:00:00.000Z',
    finishat: '2021-03-08T15:00:00.000Z',
    completed: false,
    c: null,
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Middle clock' },
  },
  {
    begin: '15:00',
    finish: '18:00',
    date: 'Mon 25/01/2021',
    id: 30,
    rating: null,
    beginat: '2021-01-25T15:00:00.369Z',
    finishat: '2021-01-25T18:00:00.369Z',
    completed: false,
    c: { fullName: 'sdfgag agarg', name: 'sdfgag', surname: 'agarg', email: 'fadheit24@gmail.com' },
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Big clock' },
  },
  {
    begin: '12:00',
    finish: '15:00',
    date: 'Wed 20/01/2021',
    id: 16,
    rating: null,
    beginat: '2021-01-20T12:00:00.000Z',
    finishat: '2021-01-20T15:00:00.000Z',
    completed: false,
    c: { fullName: 'sdfgag agarg', name: 'sdfgag', surname: 'agarg', email: 'fadheit24@gmail.com' },
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Big clock' },
  },
  {
    begin: '14:00',
    finish: '15:00',
    date: 'Tue 12/01/2021',
    id: 21,
    rating: 4,
    beginat: '2021-01-12T14:00:00.000Z',
    finishat: '2021-01-12T15:00:00.000Z',
    completed: false,
    c: { fullName: 'Sashaq Vinasa', name: 'Sashaq', surname: 'Vinasa', email: 'hems@as.com' },
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Small clock' },
  },
  {
    begin: '15:00',
    finish: '17:00',
    date: 'Mon 11/01/2021',
    id: 22,
    rating: null,
    beginat: '2021-01-11T15:00:00.000Z',
    finishat: '2021-01-11T17:00:00.000Z',
    completed: false,
    c: { fullName: 'alex legacy', name: 'alex', surname: 'legacy', email: 'sonna@mailinator.com' },
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Middle clock' },
  },
  {
    begin: '13:00',
    finish: '14:00',
    date: 'Mon 11/01/2021',
    id: 23,
    rating: null,
    beginat: '2021-01-11T13:00:00.571Z',
    finishat: '2021-01-11T14:00:00.571Z',
    completed: false,
    c: { fullName: 'alex legacy', name: 'alex', surname: 'legacy', email: 'sonna@mailinator.com' },
    m: { fullName: 'Kirill Ivanov', id: 2, name: 'Kirill', surname: 'Ivanov' },
    s: { service: 'Small clock' },
  },
]
