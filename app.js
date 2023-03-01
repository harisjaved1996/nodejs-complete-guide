const express = require("express");
const app = express();

//Templating engine
app.set('view engine', 'ejs');
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
const adminRoutes = require("./routes/admin");
// shop routes
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

// routes which start with /admin will execute line 14  and then will not conside /admin
app.use("/admin",adminRoutes);
app.use(shopRoutes);

// handling 404 page
app.use(errorController.get404);



// creating server
app.listen(3000);