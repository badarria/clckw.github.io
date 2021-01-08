export const subjects = [
  ['customers', ['id', 'name', 'surname', 'email']],
  ['services', ['id', 'name', 'time']],
  ['masters', ['id', 'name', 'surname', 'city', 'rating']],
  ['orders', ['id', 'service', 'master', 'customer', 'city', 'date', 'begin', 'end']],
  ['cities', ['id', 'name']],
]

export const subjInitPaging = {
  customers: { limit: 10, offset: 0, orderby: 'id', order: 'desc' },
  services: { limit: 5, offset: 0, orderby: 'time', order: 'asc' },
  masters: { limit: 10, offset: 0, orderby: 'id', order: 'desc' },
  orders: { limit: 15, offset: 0, orderby: 'date', order: 'desc' },
  cities: { limit: 5, offset: 0, orderby: 'id', order: 'desc' },
}
