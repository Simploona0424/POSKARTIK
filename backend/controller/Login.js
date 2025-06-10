const loginModel = require("../models/Login")


const userLogin = async (req, res) => {
    try {
        const {email,password} = req.body
        const data = new loginModel({email,password});
        const savedData = await data.save();
        res.status(201).json(savedData);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}
module.exports = userLogin