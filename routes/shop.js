const express = require("express");
const router  = express.Router();
const adminData = require("../routes/admin");

router.get("/",(req,res,next)=>{
    res.render('shop',{
        prods:adminData.products,
        pageTitle:"Shop",
        path:"/"
    });
});

module.exports = router;