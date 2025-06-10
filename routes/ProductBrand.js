const express = require("express");
const router = express.Router();
const multer = require("multer")
const { AddProductBrand, GetProductBrand, DeleteProductBrand, UpdateProductBrand } = require("../controller/ProductBrand");

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post("/addproductbrand", upload.single('brandImage'),AddProductBrand)
router.get("/getproductbrand", GetProductBrand)
router.delete("/deleteproductbrand/:id", DeleteProductBrand)
router.put("/updateproductbrand/:id", upload.single('brandImage'), UpdateProductBrand)
module.exports = router;        