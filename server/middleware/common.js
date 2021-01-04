const getBeginEnd = require("../utils/date-time");

const dateCreator = () => (req, res, next) => {
  try {
    const { date, hours, service } = req.body;
    const { end, begin } = getBeginEnd(date, hours, service.time);
    req.body = { end, begin, ...req.body };
    next();
  } catch (e) {
    console.error(e.message);
    res.status(400).send({ msg: "Something went wrong.." });
  }
};

const dbTryCatch = (func) => async (req, res) => {
  try {
    return await func(req, res);
  } catch (e) {
    console.error(e.message);
    res.status(400).send({ msg: "Database error. Please, try again later" });
  }
};

module.exports = { dateCreator, dbTryCatch };
