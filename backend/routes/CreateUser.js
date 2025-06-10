const express = require("express");
const router = express.Router();
const multer = require("multer")
const {AddUser,GetUser,UpdateUser,DeleteUser} = require("../controller/CreateUser");

const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/addUser",upload.single("userImage"),AddUser)
router.get("/getUser",GetUser)
router.put("/updateUser/:id",upload.single("userImage"),UpdateUser)
router.delete("/deleteUser/:id",DeleteUser)

module.exports = router  