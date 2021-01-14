const pool = require('../../db')
const bcrypt = require('bcrypt')
const { jwtGenerator } = require('../../utils/jwtGenerator')
const config = require('../../../config')
const url = config.mailing.baseUrl

const findMasters = async (req, res) => {
  const { city, begin, end } = req.body
  const find = await pool.any(
    `WITH excepted_masters as (
       SELECT m.id, m.name, m.surname FROM masters m where m.city=$1
       EXCEPT
       select o.master, m.name, m.surname
       FROM orders o JOIN masters m
       ON o.master=m.id
       WHERE ($2::timestamp, $3::timestamp )
       OVERLAPS (o.beginAt, o.endAt)
    )
    SELECT em.id, em.name, em.surname,
    COALESCE(round(avg(o.rating)::numeric), 5) as rating
    FROM excepted_masters em
    LEFT JOIN orders o ON em.id=o.master
    GROUP BY em.id, em.name, em.surname`,
    [city, begin, end]
  )
  return res.json(find)
}

const upsertCustomer = async (req, res) => {
  const { email, name, surname } = req.body
  const id = await pool.query(
    `INSERT INTO customers
           (name, surname, email)
           VALUES($1, $2, $3)
           ON CONFLICT (email)
           DO UPDATE SET name=$1, surname=$2
           WHERE customers.email=$3
           Returning id`,
    [name, surname, email]
  )
  return res.json(id[0].id)
}

const addNewOrder = async (req, res) => {
  const { master, customer, service, begin, end } = req.body
  const id = await pool.any(
    `INSERT
        INTO orders(master, customer, service, beginAt, endAt)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id`,
    [master, customer, service, begin, end]
  )
  res.json({
    id: id[0].id,
    msg: 'Your order is accepted. We will send you a mail with details',
  })
}

const auth = async (req, res) => {
  const { name, password } = req.body
  const user = await pool.query('SELECT * FROM admin WHERE name = $1', [name])
  if (user.length === 0) {
    return res.status(401).json('Password or name is incorrect')
  }
  const isValidPassword = await bcrypt.compare(password, user[0].password)
  if (!isValidPassword) {
    return res.status(401).json('Password or name is incorrect')
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
  const user = await pool.query(`SELECT id FROM admin WHERE id = $1`, [req.body])
  if (user[0].id === req.body) {
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
}
