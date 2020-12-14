const index = require('express').Router();
const path = require('path');
const customers = require('./admin/customers');
const masters = require('./admin/masters');
const cities = require('./admin/cities');
const orders = require('./admin/orders');
const services = require('./admin/services');
const auth = require('./auth')
const adminPage = require('./main/admin-page')
const mainPage = require('./main/find')

index.use('/admin/customers', customers);
index.use('/admin/masters', masters);
index.use('/admin/cities', cities);
index.use('/admin/orders', orders);
index.use('/admin/services', services);
index.use('/auth', auth);
index.use('/admin-page', adminPage)
index.use('/main-page', mainPage)


module.exports = index;