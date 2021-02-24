const { toObjFromStr, toObjFromJSDate } = require('../../utils/datetimefunc')
const bcrypt = require('bcrypt')
const { jwtGenerator } = require('../../utils/jwtGenerator')
const config = require('../../../config')
const { City, Service, Order, Master, Customer, Admin } = require('../../db/models')
const { jwtDecode } = require('../../utils/jwtGenerator')
const url = config.mailing.baseUrl

const getInitState = async (req, res) => {
  const city = await City.findAll()
  const service = await Service.findAll()
  return res.json({ city, service })
}

const findMasters = async (req, res) => {
  const { city, begin, finish } = req.params

  const list = await Master.findAll({
    attributes: ['rating', 'name', 'surname', 'id'],
    include: [
      { model: City, as: 'ci', where: { id: city } },
      {
        model: Order,
        as: 'o',
        required: false,
        attributes: ['rating', 'beginat', 'finishat'],
      },
    ],
  })

  const result = []
  list.forEach(({ rating, name, surname, id, o }) => {
    let reqBegin = toObjFromStr(begin),
      reqFinish = toObjFromStr(finish)

    const isBusy = o.reduce((acc, { beginat, finishat }) => {
      if (reqFinish <= toObjFromJSDate(beginat) || reqBegin >= toObjFromJSDate(finishat)) {
        acc += 1
      }
      return acc
    }, 0)

    if (isBusy === o.length) {
      result.push({ id, surname, name, rating })
    }
  })

  return res.json(result)
}

const upsertCustomer = async (req, res) => {
  const { email, name, surname } = req.body
  const id = await Customer.findOrCreate({ where: { email }, defaults: { name, surname, email } })

  return res.json(id[0].id)
}

const addNewOrder = async (req, res) => {
  const { master_id, customer_id, service_id, begin, finish } = req.body

  const id = await Order.create({
    master_id,
    customer_id,
    service_id,
    beginat: begin,
    finishat: finish,
  })

  res.json({
    type: 'success',
    id: id.id,
    msg: 'Your order is accepted. We will send you a mail with details',
  })
}

const auth = async (req, res) => {
  const { name, password } = req.body

  const user = await Admin.findAll({ where: { name } })
  if (user.length === 0) {
    return res.json('Password or name is incorrect')
  }

  const isValidPassword = await bcrypt.compare(password, user[0].password)
  if (!isValidPassword) {
    return res.json('Password or name is incorrect')
  }
  const token = jwtGenerator(user[0].id)
  return res.json({ token })
}

const confirmingMail = (req) => {
  const { userEmail, name, begin, city, service, master } = req
  const mail = {
    body: {
      name,
      intro: 'Your order details:',
      table: {
        data: [{ 'Order date': begin, City: city, 'Your master': master, 'Size of clock': service }],
      },
      outro: 'Thanks for choosing us!',
    },
  }
  const subj = 'Your order has been processed successfully'
  return { mail, userEmail, subj }
}

const ratingRequestMail = (req) => {
  const { userEmail, name, orderId } = req
  const tokenId = jwtGenerator(orderId)
  const mail = {
    body: {
      title: `Hi, ${name}! We need your feedback`,
      action: {
        instructions: "Please, follow the link below to rate the master's work",
        button: {
          color: '#3f51b5',
          text: 'Go to Rating',
          link: `${url}/orderRate/${tokenId}`,
        },
      },
      outro: 'Thanks for choosing us!',
    },
  }
  const subj = 'We need your feedback!'
  return { mail, userEmail, subj }
}

// const newAdminPassword = async (req, res) => {
//   const { name, password } = req.body
//   const saltRound = 10
//   const salt = await bcrypt.genSalt(saltRound)
//   const bcryptPassword = await bcrypt.hash(password, salt)
//   const newUser = await pool.query('INSERT INTO admin (name, password) VALUES ($1, $2) RETURNING *', [
//     name,
//     bcryptPassword,
//   ])
//   const token = jwtGenerator(newUser.rows[0].id)
//   return res.json({ token })
// }

const stayAuth = async (req, res) => {
  const { token } = req.headers
  const uuid = jwtDecode(token)
  const user = await Admin.findAll({ where: { id: uuid } })
  if (user[0].id === uuid) {
    res.json(true)
  } else res.json(false)
}

module.exports = {
  findMasters,
  upsertCustomer,
  auth,
  addNewOrder,
  stayAuth,
  confirmingMail,
  ratingRequestMail,
  getInitState,
}
