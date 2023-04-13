const express = require("express");
const routes = require("./routes");
const config = require("./config");

const app = express();
const port = config.PORT || 3002;

app.use(routes);

app.get("/", (req, res) => {
  res.json({ msg: "Hello server" });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}...`);
});
