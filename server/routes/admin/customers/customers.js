const router = require("express").Router();
const { getList, update, remove, add } = require("./customers-requests");
const { dbTryCatch } = require("../../../middleware/common");
const validator = require("../../../validation/validator");
const { customers } = require("../../../validation/schemes/admin-schema");

router.get("/:limit/:offset/:orderby/:order", dbTryCatch(getList));
router.put("/:id", validator(customers), dbTryCatch(update));
router.delete("/:id", dbTryCatch(remove));
router.post("/", validator(customers), dbTryCatch(add));

module.exports = router;
