const dbTryCatch = (func) => async (req, res) => {
  try {
    return await func(req, res);
  } catch (e) {
    console.error(e.message);
    res.status(400).send({ msg: "Database error. Please, try again later" });
  }
};

module.exports = { dbTryCatch };
