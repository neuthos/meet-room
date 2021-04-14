const jwt = require("jsonwebtoken");

function createToken(obj) {
  return jwt.sign(obj, "abogoboga");
}

module.exports = { createToken };
