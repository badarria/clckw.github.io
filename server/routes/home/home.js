const {
  sendConfirmingletter,
  sendRatingRequest,
} = require("../../middleware/mailer");

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
router.post("/confirm", (req, res) => sendConfirmingletter(req, res));
router.post("/rating", (req, res) => sendRatingRequest(req, res));

module.exports = router;
