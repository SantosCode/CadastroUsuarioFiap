const express = require("express");
const router = express.Router();
const cors = require("cors");
const Finance = require("../model/Finance");
const auth = require("../middleware/authentic");

const confCors = {
  origin: "*",
  optionsSuccessStatus: 200,
};

/* GET finance listing. */
router.get("/finance", auth, cors(confCors), async (req, res, next) => {
  Finance.find((err, finances) => {
    if (err)
      return res
        .status(400)
        .send({ output: "Error try listing finance", err: err });
    res.status(200).send({ output: "Finance", payload: finances });
  });
});

/* GET finance by username. */
router.get(
  "/finance/:holder_name",
  auth,
  cors(confCors),
  async (req, res, next) => {
    Finance.findOne(
      { holder_name: req.params.holder_name },
      async (err, finance) => {
        if (err)
          return res
            .status(400)
            .send({ output: "Error find holder_name", err: err });
        if (!finance) return res.status(204).send({ output: "not content" });
        res.status(200).send({ output: "Finance", payload: finance });
      }
    );
  }
);

/* POST finance insert. */
router.post("/finance/insert", auth, cors(confCors), async (req, res) => {
  const finance = new Finance(req.body);
  await finance
    .save()
    .then((dt) => {
      let dtSave = new Finance(dt);
      res.status(201).send({ output: "Insert success", payload: dtSave });
    })
    .catch((err) =>
      res.status(400).send({ output: "Error on try insert user", err: err.message })
    );
});

module.exports = router;
