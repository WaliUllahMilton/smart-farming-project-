import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default:"seller"
    },
}, { timestamps: true });

export default mongoose.model("seller", sellerSchema);