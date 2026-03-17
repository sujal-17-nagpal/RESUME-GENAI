const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistTokenModel")

const isAuth = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }

    const isTokenBlacklist = await blacklistTokenModel.findOne({token})

    if(isTokenBlacklist){
        return res.status(401).json({message : "invalid token"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message:"unauthorized"})
    }

}

module.exports = {isAuth}