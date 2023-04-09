const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req
  //     .get('Cookie')
  //     .split(';')[1]
  //     .trim()
  //     .split('=')[1] === 'true';
  console.log(req.session);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('642f0a5a8723761433b4ede2')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      console.log("req.session.user",req.session.user);
      res.redirect('/');
    })
    .catch(err => console.log(err));
  
};
