import express from "express";
// import bodyParser from "body-parser";
// import router from "./authRoute.js";
// import { requireSignIn, seller } from "../middleware/authMiddleWare.js";
import { createCategoryController, deleteCategoryCOntroller, getAllCategory, updateCategory } from "../controller/createCategoryController.js";
import { requireSignIn, } from "../middleware/authMiddleWare.js";
// import { sellerLoginController } from "../controller/authController.js";
// import { loginController } from "../controller/authController.js";

const router = express.Router();

//create category
router.post("/create-category", createCategoryController);

//update category
router.put('/category-update/:id',updateCategory)
// router.get("/hi",requireSignIn,sellerCheck,(req,res)=>{
//     res.status(201).send({
//         success:true,
//         message:"ok",
//         body
//     })
// })

//get all category
router.get('/get-category',getAllCategory)
router.delete('/category-delete/:id',deleteCategoryCOntroller)

router.get("/hi",requireSignIn,(req,res)=>{
    res.status(201).send({
        success:true,
        message:"ok"
    })
})



export default router;