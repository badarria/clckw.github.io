const router = require("express").Router();
const { dbTryCatch } = require("../../../middleware/wrap-func");
const { cities } = require("../../../validation/schemes/admin-schema");
const validator = require("../../../validation/validator");
const { update, getList, remove, add } = require("./cities-requests");

router.get("/:limit/:offset/:orderby/:order", dbTryCatch(getList));
router.put("/:id", validator(cities), dbTryCatch(update));
router.delete("/:id", dbTryCatch(remove));
router.post("/", validator(cities), dbTryCatch(add));

module.exports = router;
