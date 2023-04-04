const Product = require('../models/product');
const User    = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((result)=>{
    console.log("GET Products CALLING");
    res.render('shop/product-list', {
      prods: result,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((error)=>{
    console.log(error);
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId).then(result=>{
    console.log("delted cart item successfully",result);
    res.redirect('/cart');
  }).catch(error => {
    console.log(error);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then((result)=>{
    res.render('shop/product-detail', {
      product: result,
      pageTitle: result.title,
      path: '/products'
    });
  }).catch((error)=>{
    console.log(error);
  });
};


exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((result)=>{
    console.log("GET INDEX CALLING");
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(error=>{
    console.log(error);
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};