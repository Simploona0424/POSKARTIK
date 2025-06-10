const express = require("express");
const router = express.Router();
const multer = require("multer");
const {AddProduct,GetProduct,DeleteProduct,UpdateProduct} = require("../controller/Product");
const productData = require("../models/Product");

const storage = multer.memoryStorage();
const upload = multer({storage})

router.post("/addProduct",upload.single("productImage"),AddProduct)
router.get("/getProduct",GetProduct)
router.delete("/deleteProduct/:id",DeleteProduct)
router.put("/updateProduct/:id",upload.single("productImage"),UpdateProduct)
router.post('/importProducts', async (req, res) => {
  try {
    const products = req.body;
    await productData.insertMany(products); 
    res.status(200).send("Products imported successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to import products");
  }
});

module.exports = router;   