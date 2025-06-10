const balenceData = require("../../models/Pantry_User/BalenceModel")

const postBalence = async (req, res) => {
  const {
    currentDate,
    userlocation,
    balencetype,
    sumtotal,
    totalNote,
    totalCoin,
    fivedoller,
    tendoller,
    twentydoller,
    fiftydoller,
    hundreddoller,
    thausanddoller,
    onedollercoin,
    fivedollercoin,
    tendollercoin,
    twentydollercoin,
    fiftydollercoin,
    hundreddollercoin,
  } = req.body
  try {
    const savedData = new balenceData({
      currentDate,
      userlocation,
      balencetype,
      sumtotal,
      totalNote,
      totalCoin,
      fivedoller,
      tendoller,
      twentydoller,
      fiftydoller,
      hundreddoller,
      thausanddoller,
      onedollercoin,
      fivedollercoin,
      tendollercoin,
      twentydollercoin,
      fiftydollercoin,
      hundreddollercoin,
    })
    const result = await savedData.save();
    res.status(201).json(result)
  } catch (error) {
    console.log(error)
  }
}

const getBalence = async (req, res) => {
  try {
    const data = await balenceData.find()
    res.status(201).json(data)
  } catch (error) {
    console.log(error)
  }
}

const updateBalence = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
  }
}

const deleteBalence = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
  }
}
module.exports = { postBalence, getBalence, updateBalence, deleteBalence }