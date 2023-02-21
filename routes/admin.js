const express = require("express");
const router  = express.Router();
// admin/add-product => GET
router.get("/add-product",(req,res,next)=>{
    res.send("<form method='POST' action='/admin/add-product'><input type='text' name='title'/><input type='submit' value='submit'/></form>");
});

// admin/add-product => POST
router.post("/add-product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;