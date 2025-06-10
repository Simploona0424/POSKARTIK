const mongoose = require("mongoose");
const {Schema} = mongoose;

const userLogin = new Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    }
})
const loginModel = mongoose.model("login",userLogin)
module.exports =loginModel