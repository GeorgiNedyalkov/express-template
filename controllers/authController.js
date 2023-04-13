const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorParser");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    return res.status(401).render("auth/login", {
      error: getErrorMessage(error),
    });
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  try {
    const token = await authService.register(req.body);
    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    return res.status(401).render("auth/register", {
      error: getErrorMessage(error),
    });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
