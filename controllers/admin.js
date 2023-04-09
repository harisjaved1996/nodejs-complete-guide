
const Product = require('../models/product');
exports.getAddPorduct=(req,res,next)=>{
  res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      editing: false,
      path: '/admin/add-product',
      isAuthenticated: req.isLoggedIn
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then((result)=>{
    console.log("result found by id")
    if (!result) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: result,
      isAuthenticated: req.isLoggedIn
    });
  }).catch((error)=>{
    console.log(error);
  });
};



exports.postAddProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title:title, 
    price:price,
    description:description,
    imageUrl:imageUrl,
    userId:req.user
  });
  product.save().then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
      isAuthenticated: req.isLoggedIn
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId).then(product=>{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl    = updatedImageUrl;
    return product.save();
  }).then((result)=>{
    console.log("product updated successfully");
    res.redirect('/admin/products');
    isAuthenticated: req.isLoggedIn;
  }).catch((error)=>{
    console.log(error);
  });
  
};

exports.getProducts=(req,res,next)=>{
  Product.find()
  // select('title -_id').
  // populate('userId').
  .then((result)=>{
    console.log(result);
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isAuthenticated: req.isLoggedIn
    });
  }).catch((error)=>{
    console.log(error);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId).then(()=>{
    console.log("product Deleted in controller");
    res.redirect('/admin/products');
    isAuthenticated: req.isLoggedIn
  }).catch((error)=>{
    console.log(error);
  });
  
};
