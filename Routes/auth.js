const express = require("express");
const router = express.Router();

const { register, login } = require("../Controllers/auth");

const { auth } = require("../Middleware/auth");

router.post("/register", register);

router.post("/login", login);

module.exports = router;
