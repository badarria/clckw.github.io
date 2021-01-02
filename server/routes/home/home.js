const { dateCreator } = require("../../middleware/common");
const { findMasters, upsertCustomer, auth } = require("./home-requests");
const router = require("express").Router();
const {
  masters,
  customer,
  loginForm,
} = require("../../validation/schemes/home-schema");
const validator = require("../../validation/validator");
const { dbTryCatch } = require("../../middleware/common");

const dataSelector = () => (req, res, next) => {
  try {
    const { end, begin, city } = req.body;
    req.body = { city: city.id, end, begin };
    next();
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
};

router.get(
  "/find",
  validator(masters, "query"),
  dateCreator(),
  dataSelector(),
  dbTryCatch(findMasters)
);
router.post("/customer", validator(customer), dbTryCatch(upsertCustomer));
router.post("/auth", validator(loginForm), dbTryCatch(auth));
// router.get("/auth/verify", authorization, dbTryCatch(stayAuth))
// router.post("/auth/new", dbTryCatch(newAdminPassword))

module.exports = router;
