const express = require("express");
const router  = express.Router();
// adding path 
const path = require("path");

router.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;