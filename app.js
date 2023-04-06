const express = require("express");
const app = express();
//Templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

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
const mongoose = require('mongoose');
const User = require("./models/user");

// app.use((req, res, next) => {
//   User.findById('6425fb41164e9a7868aad29f').then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       console.log("req user",req.user);
//       next();
//     })
//     .catch(err => console.log(err));
// });
// routes which start with /admin will execute line 14  and then will not conside /admin
app.use("/admin",adminRoutes);
app.use(shopRoutes);

// handling 404 page
app.use(errorController.get404);
mongoose.connect('mongodb://127.0.0.1:27017/shop').then(result=>{
  console.log("app connected with database");
  app.listen(3000);
}).catch(error=>{
  console.log("app did not connect with the mongodb",error);
})

/*
  mongodb+srv://mharisjaved1996:drG8sdOfPtmVXcXW@cluster0.vrmyxzc.mongodb.net/?retryWrites=true&w=majority
  mongodb://127.0.0.1:27017/ecom
*/ 

