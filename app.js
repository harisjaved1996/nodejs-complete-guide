const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store:store
  })
);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

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


