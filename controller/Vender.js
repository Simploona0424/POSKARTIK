const VenderData = require("../models/Vender")

const AddVender = async (req, res) => {
    try {
        const {
            vender,
            vendercode,
            userName,
            email,
            phoneno,
            address,
            state,
            city,
            pincode,
            gstno,
            pan,
            productbrand,
            newRow
        } = req.body
        const saveddata = new VenderData({
            vender,
            vendercode,
            userName,
            email,
            phoneno,
            address,
            state,
            city,
            pincode,
            gstno,
            pan,
            productbrand,
            newRow
        })
        const result = await saveddata.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const GetVender = async (req, res) => {
    try {
        const response = await VenderData.find();
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
}
const UpdateVender = async (req, res) => {
    try {
        const id = req.params.id;
        const { vender,email, phoneno, address, state, city, pincode, gstno, pan, productbrand, newRow } = req.body;
        const result = await VenderData.findByIdAndUpdate(id, { vender, email, phoneno, address, state, city, pincode, gstno, pan, productbrand, newRow }, { new: true })
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const DeleteVender = async (req, res) => {
    try {
        const { id } = req.params;
        await VenderData.findByIdAndDelete(id);
        res.status(200).send("Delete successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};

module.exports = { AddVender, GetVender, UpdateVender, DeleteVender }