const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, dropDups: true },
  password: { type: String },
  friendList: { type: [String] },
  roles: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
