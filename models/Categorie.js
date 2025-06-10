const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorieSchema = new Schema({
    categorieName: {
        type: String
    },
    gst: {
        type: String
    },
    categorieImage: {
        type: String
    }
})
const CategorieData = mongoose.model("categorie", categorieSchema);
module.exports = CategorieData