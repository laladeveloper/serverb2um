import mongoose, { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "usd",
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Payment = model("Payment", PaymentSchema);
export default Payment;
