const express = require("express");
const router = express.Router();
const {AddOrder,GetOrder,UpdateOrder,DeleteOrder} = require("../controller/Order")

router.post("/addorder", AddOrder);
router.get("/getorder", GetOrder);
router.put("/updateorder/:id", UpdateOrder);
router.delete("/deleteorder/:id", DeleteOrder);


module.exports = router;  