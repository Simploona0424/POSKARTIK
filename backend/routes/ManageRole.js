const express = require("express");
const router = express.Router();
const { CreateRole, GeteRole, UpdateeRole, DeleteRole } = require("../controller/ManageRole")

router.post("/addRole", CreateRole)
router.get("/getRole", GeteRole)
router.put("/updateRole/:id", UpdateeRole)
router.delete("/deleteRole/:id", DeleteRole)

module.exports = router;