const express = require("express");
const router = express.Router();

//index route
router.get("/",(req,res)=>{
    res.send("Get for users")
})

//show route
router.get("/:id",(req,res)=>{
    res.send("Get for show  users")
})
//post route
router.post("/",(req,res)=>{
    res.send("post for users")
})
//delete route
router.delete("/:id",(req,res)=>{
    res.send("delete for users")
})

module.exports = router;