const express = require("express");
const router  = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is-auth');
// // admin/add-product => GET
router.get("/add-product", isAuth ,adminController.getAddPorduct);

router.get('/edit-product/:productId', isAuth , adminController.getEditProduct);

// // /admin/products => GET
router.get('/products', isAuth , adminController.getProducts);

// //XXXXXXXXXXXXXXXXXXXXXXxx admin/add-product => POST XXXXXXXXXXXXXXXXXXXX
router.post("/add-product", isAuth ,adminController.postAddProduct);

router.post('/edit-product', isAuth , adminController.postEditProduct);

router.post('/delete-product', isAuth , adminController.postDeleteProduct);

// module.exports = router;
module.exports = router;