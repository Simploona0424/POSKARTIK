const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: String
    },
    emailid: {
        type: String
    },
    phoneno: {
        type: String
    },
    gstno: {
        type: String
    },
    panno: {
        type: String
    },
    address1: {
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
    productdetail: [
        {
            id: {
                type: Number
            },
            product: {
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
            productBrand: {
                type: String
            },
        }
    ]
})
const orderModelData = mongoose.model("orders", orderSchema)

module.exports = orderModelData