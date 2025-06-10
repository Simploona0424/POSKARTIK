const manageroleData = require("../models/ManageRole")

const CreateRole = async (req, res) => {
    try {
        const savedData = new manageroleData(req.body)
        const result = await savedData.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const GeteRole = async (req, res) => {
    try {
        const result = await manageroleData.find()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const UpdateeRole = async (req, res) => {
    try {
        const id = req.params.id;
        const result =await manageroleData.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const DeleteRole = async (req, res) => {
    try {
       const id = req.params.id;
       await manageroleData.findByIdAndDelete(id)
       res.status(200).send("delete successfull..")
    } catch (error) {
        console.log(error)
    }
}
module.exports = { CreateRole, GeteRole, UpdateeRole, DeleteRole }
