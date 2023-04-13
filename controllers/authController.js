const router = require("express").Router();
const authService = require("../services/authService");

router.get("/login", (req, res) => {
  res.render("auth/login");
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

    console.log(token);
    res.redirect("/");
  } catch (error) {
    res.status(400).render("auth/login", {
      error: error,
    });
  }
});

module.exports = router;
