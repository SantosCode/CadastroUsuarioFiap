const mongoose = require("mongoose");

const table = new mongoose.Schema({
  bank_name: { type: String, required: true },
  count_type: { type: String, required: true },
  holder_name: { type: String, required: true, unique: true },
  card_limit: { type: String, required: true },
});

module.exports = mongoose.model("finance", table);
