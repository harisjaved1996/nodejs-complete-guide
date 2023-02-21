const express = require("express");
const router  = express.Router();

router.get("/add-product",(req,res,next)=>{
    res.send("<form method='POST' action='/admin/product'><input type='text' name='title'/><input type='submit' value='submit'/></form>");
});

router.post("/product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;