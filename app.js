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
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");
const mongoose = require('mongoose');
const User = require("./models/user");

app.use((req, res, next) => {
  User.findById('642f0a5a8723761433b4ede2').then(user => {
      req.user = user;
      console.log("req user",req.user);
      next();
    })
    .catch(err => console.log(err));
});
// routes which start with /admin will execute line 14  and then will not conside /admin
app.use("/admin",adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
// handling 404 page
app.use(errorController.get404);
mongoose.connect('mongodb://127.0.0.1:27017/shop').then(result=>{
  console.log("app connected with database");
  User.findOne().then(user=>{
    console.log(user);
    if(!user){
      const user = new User({
        name:'haris',
        email:'haris@yahoo.com',
        cart: {
          items:[]
        }
      });
      user.save();
    }
  });
  app.listen(3000);
}).catch(error=>{
  console.log("app did not connect with the mongodb",error);
})

/*
  mongodb+srv://mharisjaved1996:drG8sdOfPtmVXcXW@cluster0.vrmyxzc.mongodb.net/?retryWrites=true&w=majority
  mongodb://127.0.0.1:27017/ecom
*/ 

