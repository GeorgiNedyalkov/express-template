const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const config = require("./config");
const connectDB = require("./config/database");
const setupViewEngine = require("./config/viewEngine");
const { authentication } = require("./middlewares/authMiddleware");

const port = config.PORT || 3002;

const app = express();
setupViewEngine(app);

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
