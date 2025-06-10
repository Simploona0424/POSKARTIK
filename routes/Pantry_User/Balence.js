const express = require("express");
const { postBalence, updateBalence, getBalence, deleteBalence } = require("../../controller/Pantry_User/BalenceController");
const router = express.Router();

router.post("/balence",postBalence)
router.get("/getbalence",getBalence)
router.put("/updatebalence/:id",updateBalence)
router.delete("/deletebalence/:id",deleteBalence)
module.exports = router