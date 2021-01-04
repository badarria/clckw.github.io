const router = require("express").Router();
const { dbTryCatch } = require("../../../middleware/common");
const { services } = require("../../../validation/schemes/admin-schema");
const validator = require("../../../validation/validator");
const { update, getList, remove, add } = require("./services-requests");

const dataSelector = () => (req, res, next) => {
  try {
    const { time, name, id } = req.body;
    req.body = { time: time.id, name, id };
    next();
  } catch (e) {
    res.status(400).send({ msg: "Invalid data. Please, try again." });
  }
};

router.get("/:limit/:offset/:orderby/:order", dbTryCatch(getList));
router.put("/:id", validator(services), dataSelector(), dbTryCatch(update));
router.delete("/:id", dbTryCatch(remove));
router.post("/", validator(services), dataSelector(), dbTryCatch(add));

module.exports = router;
