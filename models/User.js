const mongoose = require("mongoose");
const Permission = require("./Permission");
const Company = require("./Company");

const UserSchema = new mongoose.Schema(
  {
    user_name: String,
    user_email: String,
    user_password: String,
    permission_id: { type: mongoose.Schema.ObjectId, ref: "permission" },
    comp_id: { type: mongoose.Schema.ObjectId, ref: "comp" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
