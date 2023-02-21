const express = require("express");
const app = express();

app.use("/product",(req,res,next)=>{
    res.send("<h1>this is product page</h1>");
});

app.use("/",(req,res,next)=>{
    res.send("<h1>This is default call</h1>");
});

// creating server
app.listen(3000);