import { Master } from './Master'
import { Customer } from './Customer'
import { City } from './City'
import { Service } from './Service'
import { Admin } from './Admin'
import { Order } from './Order'
import { User } from './Users'

export { Admin, Customer, Order, City, Master, Service, User }

// Master.hasMany(Order, {
//   as: 'o',
//   foreignKey: 'master_id',
//   targetKey: 'id',
// })

// Customer.hasMany(Order, {
//   targetKey: 'customer_id',
//   foreignKey: 'id',
// })

// Service.hasMany(Order, {
//   targetKey: 'service_id',
//   foreignKey: 'id',
// })

// Order.belongsTo(Master, {
//   as: 'm',
//   foreignKey: 'master_id',
//   onDelete: 'SET NULL',
//   onUpdate: 'SET NULL',
// })

// Order.belongsTo(Customer, {
//   as: 'c',
//   foreignKey: 'customer_id',
//   onDelete: 'SET NULL',
//   onUpdate: 'SET NULL',
// })
// Order.belongsTo(Service, {
//   as: 's',
//   foreignKey: 'service_id',
//   onDelete: 'SET NULL',
//   onUpdate: 'SET NULL',
// })

// City.hasMany(Master, {
//   targetKey: 'city_id',
//   foreignKey: 'id',
// })

// Master.belongsTo(City, {
//   as: 'ci',
//   foreignKey: 'city_id',
//   onDelete: 'SET NULL',
//   onUpdate: 'SET NULL',
// })
