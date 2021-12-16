const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const table = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phone: { type: String },
  registerDate: { type: Date, default: Date.now() },
});

table.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (_error, encrypt) => {
    user.password = encrypt;
    return next();
  });
});

table.pre("findOneAndUpdate", function (next) {
  let password = this._update.password;
  bcrypt.hash(password, 10, (_error, encrypt) => {
    this.findOneAndUpdate({}, {password: encrypt})
    return next();
  });
});

module.exports = mongoose.model("user", table);
