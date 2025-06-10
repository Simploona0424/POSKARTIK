const loationModelData = require("../models/Location")

const AddLocation = async (req, res) => {
  try {
    const { pantryName, concernPerson, contact, address1, address2, state, city, pincode, map, latitude, longitude,table } = req.body;
    const savedData = new loationModelData({ pantryName, concernPerson, contact, address1, address2, state, city, pincode, map, latitude, longitude,table });
    const result = await savedData.save();
    res.status(201).json(result)
  } catch (error) {
    console.log(error)
  }
}
const GetLocation = async (req, res) => {
  try {
    const result = await loationModelData.find()
    res.status(201).json(result)
  } catch (error) {
    console.log(error)
  }
}
const UpdateLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const { pantryName, concernPerson, contact, address1, address2, state, city, pincode, map, latitude, longitude,table } = req.body
    const result = await loationModelData.findByIdAndUpdate(id,{ pantryName, concernPerson, contact, address1, address2, state, city, pincode, map, latitude, longitude,table }, { new: true })
    res.status(201).json(result)
  } catch (error) {
    console.log(error)
  }
}
const DeleteLocation = async (req, res) => {
  try {
    const id =  req.params.id;
    await loationModelData.findByIdAndDelete(id)
    res.status(200).send("delete successfll")
  } catch (error) {
    console.log(error)
  }
}

module.exports = { AddLocation, GetLocation, UpdateLocation, DeleteLocation }