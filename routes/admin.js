const express = require("express");
const router  = express.Router();
const { body } = require('express-validator');

const adminController = require("../controllers/admin");
const isAuth = require('../middleware/is-auth');
// // admin/add-product => GET
router.get("/add-product", isAuth ,adminController.getAddProduct);

router.get('/edit-product/:productId', isAuth , adminController.getEditProduct);

// // /admin/products => GET
router.get('/products', isAuth , adminController.getProducts);

// //XXXXXXXXXXXXXXXXXXXXXXxx admin/add-product => POST XXXXXXXXXXXXXXXXXXXX
router.post(
    '/add-product',
    [
        body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
    ],
    isAuth,
    adminController.postAddProduct
);

router.post('/edit-product',
    [
        body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
    ],
    isAuth,
    adminController.postEditProduct
);

router.post('/delete-product', isAuth , adminController.postDeleteProduct);

// module.exports = router;
module.exports = router;