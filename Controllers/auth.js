const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.login = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    console.log("req.body:", req.body);

    if (!user_name || !user_password) {
      return res.status(400).send("username or password missing");
    }

    const user = await User.findOne({ user_name });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(400).send("Password wrong");
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, "jwtsecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.json({ token, payload });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};
