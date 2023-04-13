const User = require("../models/User");
const config = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");

exports.findByEmail = (email) => User.findOne({ email });

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

  const hashedPassword = await bcrypt.hash(password, 7);

  await User.create({ username, email, password: hashedPassword });

  return this.login(email, password);
};

exports.login = async (email, password) => {
  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error("Username or password are not correct");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Username or password are not correct");
  }

  const payload = {
    _id: user._id,
    email,
    username: user.username,
  };

  const token = await jwt.sign(payload, config.SECRET);

  return token;
};
