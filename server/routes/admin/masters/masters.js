const { dbTryCatch } = require("../../../middleware/wrap-func");
const router = require("express").Router();
const { update, add, remove, getList, getKeys } = require("./masters-requests");
const { masters } = require("../../../validation/schemes/admin-schema");
const validator = require("../../../validation/validator");

router.get("/:limit/:offset/:orderby/:order", dbTryCatch(getList));
router.get("/foreignKeys", dbTryCatch(getKeys));
router.put("/:id", validator(masters), dbTryCatch(update));
router.post("/", validator(masters), dbTryCatch(add));
router.delete("/:id", dbTryCatch(remove));

module.exports = router;
