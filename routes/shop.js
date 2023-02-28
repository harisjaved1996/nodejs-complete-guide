const express = require("express");
const router  = express.Router();
const adminData = require("../routes/admin");
// adding path 
const path = require("path");
const rootDir = require("../util/path");

router.get("/",(req,res,next)=>{
    res.render('shop',{
        prods:adminData.products,
        docTitle:"Shop"
    });
});

module.exports = router;