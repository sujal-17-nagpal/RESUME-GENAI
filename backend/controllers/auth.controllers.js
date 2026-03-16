const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    
  try {
    const { userName, email, password } = req.body;
    if (!userName) {
      return res.status(404).json({ message: "userName is a required field" });
    }
    if (!email) {
      return res.status(404).json({ message: "Email is a required field" });
    }
    if (!password) {
      return res.status(404).json({ message: "Password is a required field" });
    }

    const existingUser = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this userName or email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "user created successully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser };
