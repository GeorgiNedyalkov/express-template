const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");

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
    console.log(error);
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const token = await authService.register(
      username,
      email,
      password,
      repeatPassword
    );
    res.cookie("auth", token);
    res.redirect("/");
  } catch (error) {
    res.status(400).render("auth/login", {
      error: error.message,
    });
  }
});

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
