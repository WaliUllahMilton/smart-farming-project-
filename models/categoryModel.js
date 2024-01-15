import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    // _id:{
    //     type:String,
    //     required:true
    // },
    slug: {
        type: String,
        lowerCase:true,
        unique:true
    }
},{timestamps:true});
const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;