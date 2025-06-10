const express = require("express")
const router = express.Router();
const {AddLocation,GetLocation,UpdateLocation,DeleteLocation} = require("../controller/Location")
router.post("/addlocation",AddLocation)
router.get("/getlocation",GetLocation)
router.put("/updatelocation/:id",UpdateLocation)
router.delete("/deletelocation/:id",DeleteLocation);

module.exports =router