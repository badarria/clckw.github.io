import { Order } from '../../../../db/models'

export const getPdfData = async (id: string) => {
  const details = await Order.scope('allIncl').findOne({ where: { id }, include: [] })
  if (!details) return new Error("Order wasn't found")
  else {
    const strDetails = JSON.parse(JSON.stringify(details))
    const { service, master, customer, date, begin, price, m, c } = strDetails
    return {
      service,
      master,
      orderId: id,
      customer,
      begin: `${date} ${begin}`,
      price,
      customerEmail: c?.user?.email,
      masterEmail: m?.user?.email,
    }
  }
}
