import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
    id:{
        type:String
    },role: {
        type: String,
        default:"Customer"
    }
}, { timestamps: true });

export default mongoose.model("users", userSchema);