const jwt = require("jsonwebtoken");
const settings = require("../config/settings");

const auth = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.status(401).send({ output: "token is required" });
  }
  jwt.verify(token, settings.jwt_key, (err, result) => {
    if (err) {
      return res
        .status(401)
        .send({ output: `Invalid token -> ${err.message}` });
    }
    req.content = {
      id: result.id,
      username: result.username,
      name: result.name,
    };
    return next();
  });
};
module.exports = auth;