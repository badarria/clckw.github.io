const index = require('express').Router();
const path = require('path');
const customers = require('./admin/admin-customers');
const masters = require('./admin/admin-masters');
const cities = require('./admin/admin-cities');
const orders = require('./admin/admin-orders');
const services = require('./admin/admin-services');
const auth = require('./home/home-auth')
const adminPage = require('./admin/admin')
const homePage = require('./home/home')

index.use('/admin', adminPage)
index.use('/admin/customers', customers);
index.use('/admin/masters', masters);
index.use('/admin/cities', cities);
index.use('/admin/orders', orders);
index.use('/admin/services', services);
index.use('/home', homePage)
index.use('/home/auth', auth);



module.exports = index;