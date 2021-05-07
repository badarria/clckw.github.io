import { Order } from '../db/models'
import cron from 'node-cron'
import { DateTime } from 'luxon'
import { Op } from 'sequelize'
import { createMail, Mail, transporter } from '../routes/shared/utils/mailer'

const getCreatedMail = (
  customer: string,
  service: string,
  price: string,
  master: string,
  userEmail: string,
  date: string,
  begin: string
) => {
  const table = [
    {
      title: 'Your next order:',
      data: [{ 'Begin at': `${date} ${begin}`, Customer: customer, 'Size of clock': service, Amount: price }],
    },
  ]

  const mail: Mail = {
    body: { name: master, table, outro: 'May the force be with you!' },
  }
  const subj = 'Order reminder'
  return createMail(mail, userEmail, subj)
}

export default cron.schedule(`0 0 7-19 * * *`, async () => {
  const beginPlus = DateTime.now().plus({ hours: 1, minutes: 5 }).toSQL()
  const beginMinus = DateTime.now().plus({ minutes: 55 }).toSQL()
  const orders = await Order.scope('allIncl').findAll({ where: { beginat: { [Op.between]: [beginMinus, beginPlus] } } })
  if (!orders || !orders.length) return

  for (let { customer, m, master, service, price, begin, date } of orders) {
    const userEmail = m.user?.email
    if (!userEmail) return
    const mail = getCreatedMail(customer, service, price, master, userEmail, date, begin)
    await transporter.sendMail(mail)
  }
})
