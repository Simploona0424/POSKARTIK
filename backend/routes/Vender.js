const express = require("express");
const router = express.Router();
const { AddVender, GetVender, DeleteVender, UpdateVender } = require("../controller/Vender")
router.post("/addVender", AddVender)
router.get("/getVender", GetVender)
router.delete("/deleteVender/:id", DeleteVender)
router.put("/updateVender/:id", UpdateVender)
module.exports = router; 