const mongoose = require("mongoose");
const { Schema } = mongoose;

const venderSchema = new Schema({
    vender: {
        type: String
    },
    vendercode: {
        type: String
    },
    userName: {
        type: String,
    },
    email: {
        type: String
    },
    phoneno: {
        type: String
    },
    address: {
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
    gstno: {
        type: String
    },
    pan: {
        type: String
    },
    productbrand: {
        type: String
    },
    newRow: [
        {
            id: {
                type: Number
            },
            ProductName: {
                type: String
            },
            SKUID: {
                type: String
            },
            Category: {
                type: String
            },
            SubCategory: {
                type: String
            },

        }

    ],

})
const VenderData = mongoose.model("venders", venderSchema);
module.exports = VenderData