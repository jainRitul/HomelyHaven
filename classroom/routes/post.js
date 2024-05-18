const express = require("express");
const router = express.Router();
//posts routes
//index route
router.get("/",(req,res)=>{
    res.send("Get for posts")
})

//show route
router.get("/:id",(req,res)=>{
    res.send("Get for show  posts")
})
//post route
router.post("/",(req,res)=>{
    res.send("post for posts")
})
//show route
router.delete("/:id",(req,res)=>{
    res.send("delete for posts")
})
module.exports = router;