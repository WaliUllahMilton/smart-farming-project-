import { hashPassword, comparePassword } from "../helper/helper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
import sellerModel from "../models/sellerModel.js";

//registration controller for user
export const registerController = async(req, res) => {
    try {
        const { name, email, password, address,answer } = req.body;
        //validation
        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: "name is require" });
        }
        //check user
        const existingUser = await userModel.findOne({ email })
            //existing user
        if (existingUser) {
            return res.status(400).json({
                seccuess: false,
                message: 'User already registered'
            });
        }
        // hash the pashh
        const hashedPassword = await hashPassword(password);
        //save user to database
        const user = await new userModel({ name, email,answer, address, password: hashedPassword }).save();
        res.status(201).json({
            success: true,
            message: "user register successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in registration",
            error: error.message
        })
    }
}


// registration controller for seller

export const sellerRegisterController = async(req, res) => {
    try {
        const { name, email, password, address,role,answer } = req.body;
        //validation
        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: "name is require" });
        }
        //check user
        const existingUser = await sellerModel.findOne({ email })
            //existing user
        if (existingUser) {
            return res.status(400).json({
                seccuess: false,
                message: 'User already registered'
            });
        }
        // hash the pashh
        const hashedPassword = await hashPassword(password);
        //save user to database
        const user = await new sellerModel({ name,role, email,answer, address, password: hashedPassword }).save();
        res.status(201).json({
            success: true,
            message: "user register successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in registration",
            error: error.message
        })
    }
}

//loginController user
//dot env
dotenv.config();
export const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            });
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                email: "Email is not registeres"
            });
        }
        //invalid password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).send({
                success: false,
                password: "Invalid Password"
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                address: user.address
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message
        })
    }
};

//login controller seller
export const sellerLoginController = async(req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            });
        }
        //check user
        const user = await sellerModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                email: "Email is not registeres"
            });
        }
        //invalid password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).send({
                success: false,
                password: "Invalid Password"
            });
        }
        //token
        const token =JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                address: user.address
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message
        })
    }
};
// forgot password controller
export const forgotPasswordController = async (req,res)=>{
    try {
        const {email,answer,newPassword}=req.body;
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Answare is required"});
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"});
        }
        //check
        const user =await userModel.findOne({email,answer});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong email or Answer"
            })
        }
        const hashed =await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password: hashed});
        res.status(200).send({
            success:true,
            message:"Password reset Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wrong",
            error
        })
    }
}
//seller forgot passwor
export const sellerForgotPasswordController = async (req,res)=>{
    try {
        const {email,answer,newPassword}=req.body;
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Answare is required"});
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"});
        }
        //check
        const user =await sellerModel.findOne({email,answer});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong email or Answer"
            })
        }
        const hashed =await hashPassword(newPassword)
        await sellerModel.findByIdAndUpdate(user._id,{password: hashed});
        res.status(200).send({
            success:true,
            message:"Password reset Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wrong",
            error
        })
    }
}
//test controller
export const testController = (req, res) => {
    res.send('protected Route')
}