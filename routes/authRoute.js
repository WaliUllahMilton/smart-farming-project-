import express from 'express';
import { registerController, 
loginController,
forgotPasswordController,
sellerRegisterController, 
sellerLoginController,
sellerForgotPasswordController,
getOrdersController} from '../controller/authController.js'
import {  requireSignIn } from '../middleware/authMiddleWare.js';
// router object
const router = express.Router();
//routing
//register || method POST

router.post("/register", registerController);
//selller registratin
router.post("/seller-register",sellerRegisterController);

//login user ||POST
router.post('/login', loginController);
//login seller || POST
router.post('/seller-login',sellerLoginController);
//
router.get("/hi",sellerLoginController,(req,res)=>{
  res.status(201).send({
      success:true,
      message:"ok",
      body
  })
})
//order list || get
// router.get("/orders",getOrdersController)

export default router;

//user forgot password POST
router.post('/forgot-password',forgotPasswordController);

//seller forgot password
router.post('/seller-forgotpasswor',sellerForgotPasswordController);
// test route
// router.get("/test", requireSignIn, seller, testController)

//product post

router.post("/add-product",)

//protected route auth

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok : req.role});
  });
  
router.get('/orders/:id', getOrdersController);
  