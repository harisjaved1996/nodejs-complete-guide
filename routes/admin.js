const express = require("express");
const router  = express.Router();

const adminController = require("../controllers/admin");

// admin/add-product => GET
router.get("/add-product",adminController.getAddPorduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

//XXXXXXXXXXXXXXXXXXXXXXxx admin/add-product => POST XXXXXXXXXXXXXXXXXXXX
router.post("/add-product",adminController.postAddProduct);

router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

// module.exports = router;
module.exports = router;