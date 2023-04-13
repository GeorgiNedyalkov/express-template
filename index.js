const express = require("express");

const routes = require("./routes");
const config = require("./config");
const setupViewEngine = require("./config/viewEngine");

const port = config.PORT || 3002;

const app = express();
setupViewEngine(app);

app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}...`);
});
