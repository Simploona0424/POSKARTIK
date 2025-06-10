const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
    pantryName: {
        type: String
    },
    concernPerson: {
        type: String
    },
    contact: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    map: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    table: {
        type: Number
    },
})
const loationModelData = mongoose.model("location", locationSchema);
module.exports = loationModelData