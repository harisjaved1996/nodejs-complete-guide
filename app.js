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
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


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

// products means if a user delete then all the products related to user will also delete
// Associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
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
        // console.log("user 01",user)
        return user.createCart();
    }).then(cart=>{
        app.listen(3001);
    }).catch(err => {
    console.log("not created",err);
});
