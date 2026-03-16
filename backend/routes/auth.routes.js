const express = require("express")
const { registerUser } = require("../controllers/auth.controllers")

const authRouter = express.Router()

/**
 * @route POST api/auth/register
 */
authRouter.post("/register",registerUser)

module.exports = authRouter