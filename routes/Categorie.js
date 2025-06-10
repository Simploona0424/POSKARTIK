const express = require("express");
const router = express.Router();
const multer = require("multer")
const { AddCategorie, GetCategorie, UpdateCategorie, DeleteCategorie } = require("../controller/Categorie")

const storage = multer.memoryStorage();
const upload = multer({ storage })
router.post("/addcategorie", upload.single('categorieImage'), AddCategorie)
router.get("/getcategorie", GetCategorie)
router.put("/updatecategorie/:id", upload.single('categorieImage'), UpdateCategorie)
router.delete("/deletecategorie/:id", DeleteCategorie)
module.exports = router   