import mongoose from "mongoose";
const producSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug:{
        type : String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: "category",
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:String
    }
}, { timestamps: true });
const productModel = mongoose.model("product", producSchema);
export default productModel