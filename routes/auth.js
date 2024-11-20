// routes/auth.js
const express = require("express");
const router = express.Router();
const { generateToken } = require("../functions");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.get("/login", (req, res) => {
  res.render("index", { path: "pages/login", req: req, error: null });
});

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const validateCredentials = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("index", {
      path: "pages/login",
      req: req,
      error: "Username and password are required",
    });
  }

  if (username === ADMIN_USERNAME) {
    if (bcrypt.compareSync(password, ADMIN_PASSWORD)) {
      return next();
    }
  }

  res.render('index', { path: 'pages/login', req: req, error: 'Invalid credentials' });
};

router.post("/login", validateCredentials, (req, res) => {
  const { username } = req.body;
  const token = generateToken({ username });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
