const mongoose = require("mongoose");
const {Schema} = mongoose;

const productBrandSchema = new Schema({
    brandName:{
        type:String
    },
    brandImage:{
        type:String
    }
})
const productBrandData = mongoose.model("productbrand",productBrandSchema);

module.exports = productBrandData