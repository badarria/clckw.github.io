const {
  getFiltered,
  getKeys,
  getList,
  remove,
  update,
  add,
} = require("./orders-requests");
const { dateCreator, dbTryCatch } = require("../../../middleware/common");
const { orders } = require("../../../validation/schemes/admin-schema");
const validator = require("../../../validation/validator");
const router = require("express").Router();

const dataSelector = () => (req, res, next) => {
  try {
    const { end, begin, customer, master, service } = req.body;
    req.body = {
      service: service.id,
      end,
      begin,
      master: master.id,
      customer: customer.id,
    };
    next();
  } catch (e) {
    res.status(400).send({ msg: "Invalid data. Please, try again." });
  }
};

router.get("/:limit/:offset/:orderby/:order", dbTryCatch(getList));
router.get("/filtered", dbTryCatch(getFiltered));
router.get("/foreignKeys", dbTryCatch(getKeys));
router.put(
  "/:id",
  validator(orders),
  dateCreator(),
  dataSelector(),
  dbTryCatch(update)
);
router.post(
  "/",
  validator(orders),
  dateCreator(),
  dataSelector(),
  dbTryCatch(add)
);
router.delete("/:id", dbTryCatch(remove));

module.exports = router;
