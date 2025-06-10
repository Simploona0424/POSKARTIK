const mongoose  = require("mongoose")

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://kartikp:NVkaFd0NLu2hrbL6@cluster0.v4q6oz8.mongodb.net/paragraph")
        console.log("databasee connection successful")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;