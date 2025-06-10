const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
    },
    employeeId: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    jobrole: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    location: {
        type: String,
    },
    userImage: {
        type: String,
    },

});
const createUserModel = mongoose.model("user", userSchema)

module.exports = createUserModel