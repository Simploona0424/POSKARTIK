const mongoose = require("mongoose");
const { Schema } = mongoose;

const balenceSchema = new Schema({
    currentDate: {
        type: String
    },
    userlocation: {
        type: String
    },
    balencetype: {
        type: String
    },
    sumtotal: {
        type: Number
    },
    totalNote: { 
        type: Number
    },
    totalCoin: {
        type: Number
    },
    fivedoller: {
        type: Number
    },
    tendoller: {
        type: Number
    },
    twentydoller: {
        type: Number
    },
    fiftydoller: {
        type: Number
    },
    hundreddoller: {
        type: Number
    },
    thausanddoller: {
        type: Number
    },
    onedollercoin: {
        type: Number
    },
    fivedollercoin: {
        type: Number
    },
    tendollercoin: {
        type: Number
    },
    twentydollercoin: {
        type: Number
    },
    fiftydollercoin: {
        type: Number
    },
    hundreddollercoin: {
        type: Number
    },
})
const balenceData = mongoose.model("balences", balenceSchema);
module.exports = balenceData