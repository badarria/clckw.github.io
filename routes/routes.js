const routes = require('express').Router();
const customers = require('./admin/customers');
const masters = require('./admin/masters');
const cities = require('./admin/cities');
const orders = require('./admin/orders');
const services = require('./admin/services');


routes.use('/admin/customers', customers);
routes.use('/admin/masters', masters);
routes.use('/admin/cities', cities);
routes.use('/admin/orders', orders);
routes.use('/admin/services', services);



module.exports = routes;