const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const settings = require("../config/settings");

/* GET login page. */
router.post("/login", function (req, res, _next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password)
    return res.status(400).send({ output: "Bad request body" });

  User.findOne({ username: username }, async (err, user) => {
    if (err) return res.status(500).send({ output: "internal error" });
    if (!user)
      return res.status(400).send({ output: "invalid user or password" });
    bcrypt.compare(password, user.password, (_err, hash) => {
      if (!hash)
        return res.status(400).send({ output: "invalid user or password" });
      const token = createToken(user._id, user.username, user.fullName);
      res.status(200).send({ output: "User logged", token: token });
    });
  }).select("+password");
});

const createToken = (id, username, name) => {
  return jwt.sign(
    { id: id, username: username, name: name },
    settings.jwt_key,
    { expiresIn: settings.jwt_expires_at }
  );
};

module.exports = router;
