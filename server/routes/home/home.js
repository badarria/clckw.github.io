const { findMasters, upsertCustomer, auth } = require("./home-requests");
const router = require("express").Router();
const {
  masters,
  customer,
  loginForm,
} = require("../../validation/schemes/home-schema");
const validator = require("../../validation/validator");
const { dbTryCatch } = require("../../middleware/wrap-func");

router.get("/find", validator(masters, "query"), dbTryCatch(findMasters));

router.post("/customer", validator(customer), dbTryCatch(upsertCustomer));
router.post("/auth", validator(loginForm), dbTryCatch(auth));
// router.get("/auth/verify", authorization, dbTryCatch(stayAuth))
// router.post("/auth/new", dbTryCatch(newAdminPassword))

module.exports = router;
