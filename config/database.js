const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(config.MONGO_URI);
  console.log("Database connected");
};

module.exports = connectDB;
