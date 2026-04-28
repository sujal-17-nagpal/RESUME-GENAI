const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistTokenModel");
const { response } = require("express");

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
      {expiresIn:"1d"}
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).json({ message: "email is a required field" });
    }
    if (!password) {
      return res.status(404).json({ message: "password is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "no user exists with this email" });
    }

    try {
      // console.log("login user controller called")
      const resp = await bcrypt.compare(password, user.password);
      // console.log(resp)
      if(resp == false){
      return res.status(400).json({ message: "incorrect password" });

      }
    } catch (error) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "login successully",
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

const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({
    message: "log out successful",
  });
};

// get user data
const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  return res.status(200).json({
    message: "user details fetched successfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
};
module.exports = { registerUser, loginUser, logoutUser, getMe };
