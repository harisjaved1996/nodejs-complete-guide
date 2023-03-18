
const Product = require("../models/product");
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
  Product.findById(prodId).then(([product])=>{
    if (!product[0]) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  }).catch((error)=>{
    console.log(error);
  });
};



exports.postAddProduct=(req,res,next)=>{
  const title      = req.body.title;
  const imageUrl   = req.body.imageUrl;
  const price      = req.body.price;
  const description = req.body.description;
  const product    = new Product(null,title, imageUrl, price, description);
  product.save().then(()=>{
    res.redirect("/");
  }).catch((error)=>{
    console.log(error);
  });
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  );
  updatedProduct.save().then(()=>{
    res.redirect('/admin/products');
  }).catch((error)=>{
    console.log(error);
  });
  
};

exports.getProducts=(req,res,next)=>{
  Product.fetchAll().then((result)=>{
    res.render('admin/products', {
      prods: result[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((error)=>{
    console.log(error);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId).then(()=>{
    res.redirect('/admin/products');
  }).catch((error)=>{
    console.log(error);
  });
  
};
