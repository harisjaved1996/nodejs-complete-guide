
const Product = require("../models/product");
exports.getAddPorduct=(req,res,next)=>{
    res.render('add-product',{
        pageTitle:"Add Product",
        path:"/admin/add-product"
    });
};

exports.postAddProduct=(req,res,next)=>{
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

exports.getAddProduct=(req,res,next)=>{
    const products = Product.fetchAll() ;
    res.render('shop',{
        prods:products,
        pageTitle:"Shop",
        path:"/"
    });
};