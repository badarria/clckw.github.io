const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (id) => {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = jwtGenerator;
