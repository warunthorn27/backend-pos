const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.createUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_phone, comp_id } =
      req.body;

    // 1.Limited to no more than 3 per company
    const countUsers = await User.countDocuments({ comp_id });

    if (countUsers >= 3) {
      return res.status(400).json({
        error: "บริษัทนี้มีพนักงานครบ 3 คนแล้ว",
      });
    }

    // 2.CHECK Duplicate Email or Username

    const exists = await User.findOne({
      $or: [{ user_email }, { user_name }],
    });

    if (exists) {
      return res.status(400).json({ error: "user นี้มีอยู่แล้ว" });
    }

    // 3.Create User in MongoDB

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);
    console.log(hashedPassword);
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_phone,
      //   permission_id,
      comp_id,
      status: true,
    });
    return res.status(200).json({
      message: "User created",
      newUser,
    });
  } catch (err) {
    console.log("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createUsersendEmail = async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_phone, comp_id } =
      req.body;

    // 1.Limited to no more than 3 per company
    const countUsers = await User.countDocuments({ comp_id });

    if (countUsers >= 3) {
      return res.status(400).json({
        error: "บริษัทนี้มีพนักงานครบ 3 คนแล้ว",
      });
    }

    // 2. CHECK Duplicate Email or Username
    const exists = await User.findOne({
      $or: [{ user_email }, { user_name }],
    });

    if (exists) {
      return res.status(400).json({ error: "user นี้มีอยู่แล้ว" });
    }

    // 3) Create User in MongoDB

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);
    console.log(hashedPassword);
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_phone,
      //   permission_id,
      comp_id,
      status: true,
    });

    // 4.Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user_email,
      subject: `User Email and Password for ${user_name}`,
      text: `
Hello ${user_name},
------------------
 USER ACCOUNT INFO
------------------
Username : ${newUser.user_name}
Email    : ${newUser.user_email}
Password : ${user_password}
Status   : ${newUser.status ? "Active" : "Inactive"}
Created  : ${newUser.createdAt}

Thank You.
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ error: "Error sending email" });
      }

      console.log("Email sent:", info.response);

      return res.status(200).json({
        message: "User created & email sent successfully",
        newUser,
      });
    });
  } catch (err) {
    console.log("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createAdminsendEmail = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);
    console.log(hashedPassword);
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      status: true,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user_email,
      subject: `New Admin created for ${user_name}`,
      text: `
Hello ${user_name},
------------------
 Admin ACCOUNT INFO
------------------
Username : ${newUser.user_name}
Email    : ${newUser.user_email}
Password : ${user_password}
Status   : ${newUser.status ? "Active" : "Inactive"}
Created  : ${newUser.createdAt}

Thank You.
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).send("Error sending email");
      }

      console.log("Email sent:", info.response);
      return res.status(200).json({
        message: "Email sent successfully!",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const usered = await User.findOne({ _id: id })
      .populate("comp_id")
      .populate("permission_id");
    res.send(usered);
  } catch (error) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.list = async (req, res) => {
  try {
    const usered = await User.find()
      .populate("comp_id")
      .populate("permission_id");
    res.send(usered);
  } catch (error) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const update_user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(update_user);
  } catch (error) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const remove_user = await User.findOneAndDelete({ _id: id });
    res.send(remove_user);
  } catch (error) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.removeall = async (req, res) => {
  try {
    const remove_user_all = await User.deleteMany({});
    res.send(remove_user_all);
  } catch (error) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
