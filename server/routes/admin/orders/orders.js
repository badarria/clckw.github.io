const {
  getFiltered,
  getKeys,
  getList,
  remove,
  update,
  add,
} = require("./orders-requests");
const { dbTryCatch } = require("../../../middleware/wrap-func");
const { orders } = require("../../../validation/schemes/admin-schema");
const validator = require("../../../validation/validator");
const router = require("express").Router();

router.get("/:limit/:offset/:orderby/:order", dbTryCatch(getList));
router.get("/filtered", dbTryCatch(getFiltered));
router.get("/foreignKeys", dbTryCatch(getKeys));
router.put("/:id", validator(orders), dbTryCatch(update));
router.post("/", validator(orders), dbTryCatch(add));
router.delete("/:id", dbTryCatch(remove));

module.exports = router;
