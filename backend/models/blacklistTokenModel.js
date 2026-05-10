const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token :{
        type :String,
        required : [true,"token is required"]
    },createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
},{timestamps:true})

const blacklistTokenModel = mongoose.model("blacklisted-tokens",blacklistTokenSchema)

module.exports = blacklistTokenModel

