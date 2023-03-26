
const Product = require('../models/product');
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
  // Product.findByPk(prodId).then((result)=>{
    req.user.getProducts({ where: { id: prodId } }).then((result)=>{
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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
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
  Product.update(
    {title:updatedTitle, price:updatedPrice, imageUrl:updatedImageUrl, description:updatedDesc},{
    where: {
      id: prodId
    }
  }
  ).then((result)=>{
    console.log("product updated successfully");
    res.redirect('/admin/products');
  }).catch((error)=>{
    console.log(error);
  });
  
};

exports.getProducts=(req,res,next)=>{
  req.user.getProducts().then((result)=>{
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
