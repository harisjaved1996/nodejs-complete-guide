const express = require("express");
const app = express();

// pug templating engine
app.set('view engine', 'pug');
app.set('views', 'views');
// 

const path = require("path");
const rootDir = require("./util/path");

// body parsing
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

// static File
app.use(express.static(path.join(rootDir,'public')));

// ########################### Routes ################################
// admin routes
const adminData = require("./routes/admin");
// shop routes
const shopRoutes = require("./routes/shop");

// routes which start with /admin will execute line 14  and then will not conside /admin
app.use("/admin",adminData.routes);
app.use(shopRoutes);

// handling 404 page
app.use((req,res,next)=>{
    // console.log(path.join(rootDir, 'views', '404.html'));
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});



// creating server
app.listen(3000);