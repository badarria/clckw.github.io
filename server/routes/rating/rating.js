const { dbTryCatch } = require("../../middleware/wrap-func");
const { getOrderToRate, setOrderRating } = require("./rating-requests");

const router = require("express").Router();

router.get("/getOrder/:orderId", dbTryCatch(getOrderToRate));
router.put("/setRating", dbTryCatch(setOrderRating));

module.exports = router;


