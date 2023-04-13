const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello router");
});

module.exports = router;
