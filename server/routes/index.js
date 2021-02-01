const index = require('express').Router()
const customers = require('./admin/customers/customers')
const masters = require('./admin/masters/masters')
const cities = require('./admin/cities/cities')
const orders = require('./admin/orders/orders')
const services = require('./admin/services/services')
const homePage = require('./home/home')
const ratingPage = require('./rating/rating')

index.use('/home', homePage)
index.use('/rating', ratingPage)
index.use('/table/customers', customers)
index.use('/table/masters', masters)
index.use('/table/cities', cities)
index.use('/table/orders', orders)
index.use('/table/services', services)

module.exports = index
