const orderModelData = require("../models/Order")

const AddOrder = async (req, res) => {
    try {
        const { emailid, phoneno, gstno, panno, address1, state, city, pincode, customer, productdetail } = req.body;
        const savedOrder = new orderModelData({ emailid, phoneno, gstno, panno, address1, state, city, pincode, customer, productdetail });
        const result = await savedOrder.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const GetOrder = async (req, res) => {
    try {
        const result = await orderModelData.find();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}  
const UpdateOrder = async (req, res) => {
    try {
        const id = req.params.id
        const { emailid, phoneno, gstno, panno, address1, state, city, pincode, customer, productdetail } = req.body;
        const result = await orderModelData.findByIdAndUpdate(id, { emailid, phoneno, gstno, panno, address1, state, city, pincode, customer, productdetail }, { new: true });
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}
const DeleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        await orderModelData.findByIdAndDelete(id)
        res.status(200).send("data delete successfull")
    } catch (error) {
        console.log(error)
    }
}
module.exports = { AddOrder, GetOrder, UpdateOrder, DeleteOrder }