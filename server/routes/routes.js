const routes = require('express').Router();
const path = require('path');
const customers = require('./admin/customers');
const masters = require('./admin/masters');
const cities = require('./admin/cities');
const orders = require('./admin/orders');
const services = require('./admin/services');
const auth = require('./auth')
const adminPage = require('./main/admin-page')


routes.use('/admin/customers', customers);
routes.use('/admin/masters', masters);
routes.use('/admin/cities', cities);
routes.use('/admin/orders', orders);
routes.use('/admin/services', services);
routes.use('/auth', auth);
routes.use('/admin-page', adminPage)

// routes.get("*", ( req, res) => {
// 	res.sendFile(path.join(__dirname, "client/build/index.html"))
// })

module.exports = routes;