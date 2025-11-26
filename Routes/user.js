const express = require("express");
const router = express.Router();
const { auth, adminCheck } = require("../Middleware/auth");

const {
  getOneUser,
  getUserRole,
  list,
  createUser,
  remove,
  updateUserByAdmin,
  updateUserbyuser,
  resetPassUserbyAdmin,
  resetPassUserbyAdmin_send,
  removeAll,
  createUsersendEmail,
  changeStatus,
} = require("../Controllers/user");

router.get("/user", auth, list);

router.get("/getone-user/:id", auth, getOneUser);

router.get("/getrole-user/:id", auth, getUserRole);

router.post("/create-user", auth, adminCheck, createUser);

router.post("/createandsend-user", auth, adminCheck, createUsersendEmail);

router.put("/update-user-byadmin/:id", auth, adminCheck, updateUserByAdmin);

router.put("/update-user-byuser/:id", auth, updateUserbyuser);

router.put(
  "/resetpass-user-byadmin/:id",
  auth,
  adminCheck,
  resetPassUserbyAdmin
);

router.put(
  "/resetpass-user-byadminsend/:id",
  auth,
  adminCheck,
  resetPassUserbyAdmin_send
);

router.put("/changestatus-user/:id", auth, adminCheck, changeStatus);

router.delete("/user/:id", auth, adminCheck, remove); //cancel

router.delete("/user", auth, adminCheck, removeAll); //cancel

module.exports = router;
