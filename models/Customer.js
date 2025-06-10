const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    customerType: {
        type: String
    },
    companyName: {
        type: String
    },
    concernPerson: {
        type: String
    },    
    emailID: {
        type: String
    },
    phoneNO: {
        type: String
    },
    location: {
        type: String
    },
    rMcode: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    gstno: {
        type: String
    },
    personalproof: {
        type: String
    },
    businessProof: {
        type: String
    },
    newRows: [{
        id: {
            type: Number
        },
        fullName: {
            type: String
        },
        emailId: {
            type: String
        },
        phoneNo: {
            type: String
        },
    }] 
})
const customerData = mongoose.model("customers", CustomerSchema)
module.exports = customerData