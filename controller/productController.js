import slugify from "slugify";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import fs from 'fs';
import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config();
// import { populate } from "dotenv";

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
  

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name || !description || !category || !price || !quantity) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name)});

        // Handle photo upload
        if (photo) {
            const fileData = fs.readFileSync(photo.path, 'base64');
            product.photo.data = fileData;
            product.photo.contentType =photo.type
            // {
            //     data: fileData,
            //     contentType: photo.type
            // };
        }

        await product.save();
        res.status(200).send({
            success: true,
            message: "Product successfully added",
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error: error.message
        });
    }
};

export const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "ALlProducts ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };

export const getSingleProductController = async (req,res) =>{
    try {
        const product = await productModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"gotsingle produce",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in gettin single product"
        })
    }
}

export const getProductPhoto = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            const base64Image = product.photo.data.toString('base64');
            const contentType = product.photo.contentType;
            const dataURI = `data:${contentType};base64,${base64Image}`;
            res.send(dataURI);
        } else {
            res.status(404).send({
                success: false,
                message: "Image not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product photo"
        });
    }
};
// get photo
export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

export const deleteProduct =async (req,res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"successfully deleted product",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in product delete",
            error
        })
    }
}


export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name || !description || !category || !price || !quantity) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        // Find product by ID and update fields
        const updatedFields = {
            name,
            description,
            price,
            category,
            quantity,
            shipping,
            slug: slugify(name),
        };

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.pid,
            updatedFields,
            { new: true }
        );

        // Handle photo upload if provided
        if (photo) {
            const fileData = fs.readFileSync(photo.path, 'base64');
            updatedProduct.photo.data = fileData;
            updatedProduct.photo.contentType = photo.type;
        }

        await updatedProduct.save();

        res.status(200).send({
            success: true,
            message: "Product successfully updated",
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error: error.message
        });
    }
};

//payment gateway API
//token
export const braintreeTokenController = async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }
            else{
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//payment
// const Order = mongoose.model("orders");

export const braintreePaymentController = async (req, res) => {
    try {
        const { amount,nonce,products,buyer } = req.body;
        // const {nonce} = req.body;
        // Use Braintree gateway to process the transaction
                
        gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: nonce,
            // deviceData: deviceDataFromTheClient,
            options: {
            submitForSettlement: true
            }
        })
        let cid=[];
        const cart = req.body.cart;
        cart.map((item)=>{
            cid.push({product : item._id,
                    quantity: item.quantity
                })
        })
        
        // console.log("request",req.body.cart)
        // console.log("user",req.body.cart)
        console.log("djshaduhsau",cid)
        // Braintree payment successful, save order details to the database
        const order = new orderModel({
            products: cid,
            buyer: req.body.auth.user.id,
            status: "Processing",
        });
        
        await order.save();
        
        res.status(200).send(req.body)

          
    } catch (error) {
        console.error(error);
        res.status(500).json({  error });
    }
};
