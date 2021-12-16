const express = require("express");
const cors = require("cors");
const router = express.Router();
const User = require("../model/User");
const auth = require("../middleware/authentic");

const confCors = {
  origin: "*",
  optionsSuccessStatus: 200,
};

/* GET users listing. */
router.get("/users", auth, cors(confCors), async (req, res, next) => {
  User.find((err, users) => {
    if (err)
      return res
        .status(400)
        .send({ output: "Error try listing users", err: err });
    res.status(200).send({ output: "Users", payload: users });
  });
});

/* GET user by username. */
router.get("/user/:username", auth, cors(confCors), async (req, res, next) => {
  User.findOne({ username: req.params.username }, async (err, user) => {
    if (err)
      return res.status(400).send({ output: "Error find username", err: err });
    if (!user) return res.status(204).send({ output: "not content" });
    res.status(200).send({ output: "User", payload: user });
  });
});

/* POST user insert. */
router.post("/users/insert", auth, cors(confCors), async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then((dt) => {
      let dtSave = new User(dt);
      dtSave.password = "*******";
      res.status(201).send({ output: "Insert success", payload: dtSave });
    })
    .catch((err) =>
      res.status(400).send({ output: "Error on try insert user", err: err })
    );
});

/* PUT user password update. */
router.put("/user/password", auth, cors(confCors), async (req, res) => {
  const username = req.body.username;
  const password = req.body.newPassword;

  if (!username || !password)
    return res.status(400).send({ output: "Bad request body" });
  User.findOneAndUpdate({ username: username }, { password: password })
    .then((dt) => res.status(200).send({ output: "User", payload: dt }))
    .catch((err) =>
      res.status(400).send({ output: "Error on try update", err: err.message })
    );
});

module.exports = router;
