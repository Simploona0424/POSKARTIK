const express = require("express")
const router = express.Router();
const upload = require("../middlewares/upload")
const { postCustomers, getCustomers, updateCustomers, deleteCustomers } = require("../controller/CustomerController")

router.post("/setcustomer", upload.fields([{ name: 'personalproof', maxCount: 1 },{ name: 'businessProof', maxCount: 1 }]), postCustomers);
router.get("/getcustomer", getCustomers);
router.put("/updatecustomer/:id", upload.fields([{ name: 'personalproof', maxCount: 1 },{ name: 'businessProof', maxCount: 1 }]), updateCustomers);
router.delete("/deletecustomer/:id", deleteCustomers);

module.exports = router;      