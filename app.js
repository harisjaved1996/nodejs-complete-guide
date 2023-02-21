const express = require("express");
const app = express();

// body parsing
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

// admin routes
const adminRoutes = require("./routes/admin");
// shop routes
const shopRoutes = require("./routes/shop");


app.use(adminRoutes);
app.use(shopRoutes);

// handling 404 page
app.use((req,res,next)=>{
    res.status(404).send("<h1>Page not found</h1>");
});



// creating server
app.listen(3000);