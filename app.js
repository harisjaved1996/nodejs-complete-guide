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

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');


app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
// routes which start with /admin will execute line 14  and then will not conside /admin
app.use("/admin",adminRoutes);
app.use(shopRoutes);

// handling 404 page
app.use(errorController.get404);

// line 41 means if a user delete then all the products related to user will also delete
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// .sync({ force: true }).then(result => {
sequelize.sync().then(result => {
    // console.log(result);
    return User.findByPk(1);
    }).then((user)=>{
        if(!user){
            User.create({name:'haris12',email:'haris@gmail.com'});
        }
        return user;
    }).then(user=>{
        app.listen(3001);
    }).catch(err => {
    console.log("not created",err);
});
