import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default:"Milton"
    },
    
    password: {
        type: String,
        default:"smartFarming"
    },
    
    id:{
        type:String
    },role: {
        type: String,
        default:"Admin"
    }
}, { timestamps: true });

export default mongoose.model("admin", adminSchema);