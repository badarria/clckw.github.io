const {
  findMasters,
  upsertCustomer,
  auth,
  confirmingMail,
  addNewOrder,
  ratingRequestMail,
} = require("./home-requests");
const router = require("express").Router();
const {
  masters,
  customer,
  loginForm,
  order,
} = require("../../validation/schemes/home-schema");
const validator = require("../../validation/validator");
const { sendMail, createMail } = require("../../middleware/mailer");
const { dbTryCatch } = require("../../middleware/wrap-func");

router.get("/find", validator(masters, "query"), dbTryCatch(findMasters));

router.post("/customer", validator(customer), dbTryCatch(upsertCustomer));
router.post("/auth", validator(loginForm), dbTryCatch(auth));
router.post("/newOrder", validator(order), dbTryCatch(addNewOrder));
router.post("/confirm", createMail(confirmingMail), sendMail());
router.post("/rating", createMail(ratingRequestMail), sendMail());
// router.get("/auth/verify", authorization, dbTryCatch(stayAuth))
// router.post("/auth/new", dbTryCatch(newAdminPassword))

module.exports = router;
