import mongoose, { model, Schema } from "mongoose";

// Order Model
const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  status: {
    type: String,
    default: "pending",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = model("Order", OrderSchema);
export default Order;
