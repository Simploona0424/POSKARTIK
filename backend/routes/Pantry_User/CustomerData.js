const express = require("express");
const router = express.Router();

const {
  AddCustomer,
  SaveAllCustomer,
  GetCustomer,
  GetAllCustomer,
  PatchCustomer,
  DeleteCustomer,
  PutCustomerData,
  UpdateSubcategorieCustomer,
  DeleteCurrentCustomer,
} = require("../../controller/Pantry_User/CustomerData");

router.post("/addCustomerData", AddCustomer);
router.post("/savedCustomer", SaveAllCustomer);
router.get("/getCustomerData", GetCustomer);
router.get("/getsavedCustomer", GetAllCustomer);
router.patch("/updateCustomerData/:customerId/:itemId", PatchCustomer);
router.patch("/UpdateSubcategorieCustomer/:customerId", UpdateSubcategorieCustomer);
router.put("/putCustomerData/:customerId", PutCustomerData);
router.delete("/deleteCustomerData/:customerId/:itemId", DeleteCustomer);
router.delete("/DeleteCurrentCustomer/:id", DeleteCurrentCustomer);
module.exports = router; 
