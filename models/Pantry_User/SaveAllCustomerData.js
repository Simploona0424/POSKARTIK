const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
    customerName: {
        type: String
    },
    phoneno: {
        type: String
    },
    customerID: {
        type: String
    },
    customerLocation: {
        type: String
    },
    orderType: {
        type: String
    },
    currentDate: {
        type: String
    },
    tableStatus: {
        type: String
    },
    ordersetList: [
        {
            categorie: {
                type: String
            },
            productImage: {
                type: String
            },
            count: {
                type: String
            },
            productName: {
                type: String
            },
            productbrand: {
                type: String
            },
            sellingPrice: {
                type: String
            },
            subcategorie: {
                type: String
            },
            minstock: {
                type: String
            },
            productstock: {
                type: String
            },
            skuid: {
                type: String
            },
        }
    ]
})
const AllcustomerData = mongoose.model("Total_Customer", customerSchema);
module.exports = AllcustomerData