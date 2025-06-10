const express = require("express");
const router = express.Router();
const multer = require("multer")
const { AddSubCategorie, GetSubCategorie, DeleteSubCategorie, UpdateSubCategorie } = require("../controller/SubCategorie")

const storage = multer.memoryStorage()
const upload = multer({storage})
router.post("/addSubCategorie",upload.single("subCategoryImage"), AddSubCategorie)
router.get("/getSubCategorie", GetSubCategorie)
router.delete("/deleteSubCategorie/:id", DeleteSubCategorie)
router.put("/updateSubCategorie/:id",upload.single("subCategoryImage"), UpdateSubCategorie)
module.exports = router;    