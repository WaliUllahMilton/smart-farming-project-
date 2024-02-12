import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  products: [
      {
          product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "product",
          },
          quantity: {
              type: Number,
              
          },
      },
  ],
  payment: {},
  buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
  },
  status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
  },
}, { timestamps: true });

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
