const index = require("express").Router();
const customers = require("./admin/customers/customers");
const masters = require("./admin/masters/masters");
const cities = require("./admin/cities/cities");
const orders = require("./admin/orders/orders");
const services = require("./admin/services/services");
const adminPage = require("./admin/admin");
const homePage = require("./home/home");

index.use("/home", homePage);
index.use("/admin", adminPage);
index.use("/admin/customers", customers);
index.use("/admin/masters", masters);
index.use("/admin/cities", cities);
index.use("/admin/orders", orders);
index.use("/admin/services", services);

module.exports = index;