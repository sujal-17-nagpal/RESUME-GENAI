const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistTokenModel")
const appCache = require("../config/cache")

const isAuth = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }

    if(appCache.get(`blacklist_${token}`)){
        return res.status(401).json({message : "invalid token"})
    }

    const cachedToken = appCache.get(token);
    if(cachedToken){
        req.user = cachedToken;
        return next();
    }

    const isTokenBlacklist = await blacklistTokenModel.findOne({token})

    if(isTokenBlacklist){
        appCache.set(`blacklist_${token}`,true,86400)
        return res.status(401).json({message : "invalid token"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        appCache.set(token,decoded,86400)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message:"unauthorized"})
    }

}

module.exports = {isAuth}