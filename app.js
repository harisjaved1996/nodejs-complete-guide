const express = require("express");
const app = express();

// body parsing
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


// Routes
app.use("/add-product",(req,res,next)=>{
    res.send("<form method='POST' action='/product'><input type='text' name='title'/><input type='submit' value='submit'/></form>");
});

app.post("/product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
});

app.use("/",(req,res,next)=>{
    res.send("<h1>Hello From Express</h1>");
});

// creating server
app.listen(3000);