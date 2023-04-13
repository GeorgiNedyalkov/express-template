const express = require("express");
const app = express();
const routes = require("./routes");

const port = 3000;

app.use(routes);

app.get("/", (req, res) => {
  res.json({ msg: "Hello server" });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}...`);
});
