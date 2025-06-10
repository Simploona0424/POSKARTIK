const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubcategorieSchema = new Schema({
    selectCategory: {
        type: String
    },
    subCategory: {
        type: String
    },
    subCategoryImage:{
        type:String
    }
})
const SubCategorieData = mongoose.model("subcategorie", SubcategorieSchema);
module.exports = SubCategorieData