const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String
    },
    skuid: {
        type: String
    },
    productstock: {
        type: String
    },
    minstock: {
        type: String
    },
    sellingPrice: {
        type: String
    },
    categorie: {
        type: String
    },
    subcategorie: {
        type: String
    },
    productbrand: {
        type: String
    },
    productImage: {
        type: String
    },
})
const productData = mongoose.model("product", productSchema);

module.exports = productData