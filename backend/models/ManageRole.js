const mongoose = require("mongoose");
const { Schema } = mongoose;

const manageroledataSchema = new Schema({
    roleName: {
        type: String,
        require: true,
    },
    manageOrder: {
        type: Boolean,
        default: false,
    },
    manageProduct: {
        type: Boolean,
        default: false,
    },
    manageCustomer: {
        type: Boolean,
        default: false,
    },
    manageProductBrand: {
        type: Boolean,
        default: false,
    },
    manageCategories: {
        type: Boolean,
        default: false,
    },
    manageSubCategories: {
        type: Boolean,
        default: false,
    },
    manageInventory: {
        type: Boolean,
        default: false,
    },
    manageLocation: {
        type: Boolean,
        default: false,
    },
    manageVendors: {
        type: Boolean,
        default: false,
    },
    manageUsers: {
        type: Boolean,
        default: false,
    },
});

const manageroleData = mongoose.model("manageroleData", manageroledataSchema);
module.exports = manageroleData;