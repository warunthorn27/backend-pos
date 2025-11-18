const User = require("../models/User");

exports.createUser = async (req, res) => {
  //   try {
  //     // const admin_id = req.user.id; // token
  //     // const admin = await User.findById(admin_id);

  //     // if (!admin) return res.status(404).send("Manager not found");
  //     // if (admin.role !== "manager") return res.status(403).send("Not allowed");

  //     const { user_name, user_email, phone, permission_id } = req.body;

  //     //const comp_id = admin.comp_id;

  //     // 1) Check user limit (max 3)
  //     const count = await User.countDocuments();
  //     if (count >= 4) {
  //       return res.status(400).send("This company already has 3 employees");
  //     }

  //     // 2) Check duplicate username/email
  //     const exists = await User.findOne({
  //       $or: [{ user_name }, { user_email }],
  //     });

  //     if (exists) {
  //       return res.status(400).send("Username or Email already exists");
  //     }

  //     // 3) Validate phone
  //     const phoneRegex = /^[0-9]{10}$/;
  //     if (!phoneRegex.test(phone)) {
  //       return res.status(400).send("Invalid phone number");
  //     }

  //     // 4) Create temporary password
  //     const tempPass = Math.random().toString(36).slice(-8);
  //     const hashed = await bcrypt.hash(tempPass, 10);

  //     // 5) Save employee
  //     const newUser = new User({
  //       user_name,
  //       user_email,
  //       user_password: hashed,
  //       permission_id,
  //       comp_id,
  //     });

  //     await newUser.save();

  //     return res.json({
  //       message: "Employee created",
  //       tempPassword: tempPass, // ส่งให้ admin เอาไปบอกพนักงาน
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send("Server error");
  //   }

  try {
    console.log(req.body);
    const usered = await new User(req.body).save();
    res.send(usered);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
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
