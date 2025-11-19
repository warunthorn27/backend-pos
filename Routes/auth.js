const express = require("express");
const router = express.Router();

const { login } = require("../Controllers/auth");

const { auth } = require("../Middleware/auth");

router.post("/login", login);

module.exports = router;
