const express = require("express");
const router  = express.Router();
const path    = require("path");
const rootDir = require("../util/path");
const products = [];
// admin/add-product => GET
router.get("/add-product",(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'));
});

// admin/add-product => POST
router.post("/add-product",(req,res,next)=>{
    products.push({title:req.body.title});
    console.log(products);
    res.redirect("/");
});

// module.exports = router;
module.exports = {
    routes:router,
    products:products
};