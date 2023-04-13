const User = require("../models/User");
const config = require("../config");
const bcrypt = require("bcrypt");

exports.register = async (username, email, password, repeatPassword) => {
  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPassword });

  // return this.login(email, password);
};
