const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then((result)=>{
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
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then((result)=>{
    console.log("Product Found");
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
  Product.findAll().then((result)=>{
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
  req.user.getCart().then(cart => {
      return cart.getProducts().then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
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
