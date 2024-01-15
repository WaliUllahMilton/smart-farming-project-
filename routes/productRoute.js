import { requireSignIn } from "../middleware/authMiddleWare.js";
import express from 'express';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProduct, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controller/productController.js";
import formidable from 'express-formidable'


const router = express.Router();


//route
//requireSignIn,
router.post('/create-product',formidable(), createProductController)
router.get('/get-product',getProductController)
router.get('/get-product/:slug',getSingleProductController)
router.get('/get-product-photo/:pid',productPhotoController)
router.delete('/delete-product/:pid',deleteProduct )
router.put('/update-product/:pid',formidable(),updateProductController )
//payments route
//token
router.get('/braintree/token', braintreeTokenController)
//payment
 router.post('/braintree/payment',braintreePaymentController)
export default router