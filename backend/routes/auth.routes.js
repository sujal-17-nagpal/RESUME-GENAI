const express = require("express")
const { registerUser, loginUser } = require("../controllers/auth.controllers")

const authRouter = express.Router()

/**
 * @route POST api/auth/register
 */
authRouter.post("/register",registerUser)

/**
 * @route POST api/auth/login
 */
authRouter.post("/login",loginUser)

module.exports = authRouter