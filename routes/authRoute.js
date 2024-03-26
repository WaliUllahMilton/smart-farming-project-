import express from 'express';
import { registerController, 
loginController,
forgotPasswordController,
sellerRegisterController, 
sellerLoginController,
sellerForgotPasswordController,
getOrdersController,
getSellerOrdersController,
OrderControll,
getUserProfile} from '../controller/authController.js'
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

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/user',getUserProfile);
router.get('/orders/:id', getOrdersController);
// router.get('/orders', getSellerOrdersController);
router.get('/orders', getSellerOrdersController);
//order update
router.put('/order-controll/:orderId',OrderControll)