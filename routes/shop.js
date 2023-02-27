const express = require("express");
const router  = express.Router();
const adminData = require("../routes/admin");
// adding path 
const path = require("path");
const rootDir = require("../util/path");

router.get("/",(req,res,next)=>{
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    console.log("working fine pug");
    res.render('shop');
});

module.exports = router;