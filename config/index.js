const config = {
  production: {
    PORT: 3000,
    SECRET: "someSecret",
    MONGO_URI: "mongodb://localhost:27017",
  },
  development: {
    PORT: 3007,
    SECRET: "devSecret",
    MONGO_URI: "mongodb://localhost:27017",
  },
};

module.exports = config[process.env.node_env || "development"];
