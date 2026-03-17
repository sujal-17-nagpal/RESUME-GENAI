const express = require("express")
const { registerUser, loginUser, logoutUser, getMe } = require("../controllers/auth.controllers")
const { isAuth } = require("../middlewares/auth.middleware")

const authRouter = express.Router()

/**
 * @route POST api/auth/register
 */
authRouter.post("/register",registerUser)

/**
 * @route POST api/auth/login
 */
authRouter.post("/login",loginUser)

/**
 * @route GET api/auth/logout
 */
authRouter.get("/logout",logoutUser)

authRouter.get("/get-me",isAuth,getMe)

module.exports = authRouter