const express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
const User = require("./schema/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ error: "Missing credentials" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ success: `${username} added successfully` });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ error: "Missing credentials" });
  }

  User.find({ username })
    .exec()
    .then(async (usersFind) => {
      if (usersFind.length <= 0) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = usersFind[0];
      if (await bcrypt.compare(password, user.password)) {
        return res
          .status(200)
          .json({ token: jwt.sign({ role: user.roles }, "privateKeyKEKW") });
      } else {
        return res.status(404).json({ error: "Wrong credentials" });
      }
    });
});
module.exports = router;
