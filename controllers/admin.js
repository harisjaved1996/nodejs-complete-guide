
const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
exports.getAddPorduct=(req,res,next)=>{
  res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      editing: false,
      path: '/admin/add-product',
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
      product: result
    });
  }).catch((error)=>{
    console.log(error);
  });
};



exports.postAddProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl );
  product.save().then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
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
  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, new ObjectId(prodId));
  product.save().then((result)=>{
    console.log("product updated successfully");
    res.redirect('/admin/products');
  }).catch((error)=>{
    console.log(error);
  });
  
};

exports.getProducts=(req,res,next)=>{
  Product.fetchAll().then((result)=>{
    console.log(result);
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((error)=>{
    console.log(error);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({
    where: {
      id: prodId
    }
  }).then(()=>{
    console.log("product Deleted");
    res.redirect('/admin/products');
  }).catch((error)=>{
    console.log(error);
  });
  
};
