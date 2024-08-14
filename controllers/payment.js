import Stripe from "stripe";
import Payment from "../models/payment.js";
import Order from "../models/order.js";
import generateUniqueUID from "../utils/uidGenerator.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { orderId, amount, currency } = req.body;
    const charges = Number(amount);

    const uid = await generateUniqueUID(Payment);

    const order = await Order.findOne({ uid: orderId })
      .populate("user") // Populating the category field
      .populate("seller") // Populating the category field
      .populate("product");
    const customer = order.user.username;
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const paymentAmount = Math.round(charges * 100); // Convert amount to cents and round to nearest integer

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency,
      metadata: { orderId: order._id.toString() },
     
    });

    const payment = new Payment({
      uid,
      order: order._id,
      paymentIntentId: paymentIntent.id,
      amount: charges.toFixed(2),
      currency: "usd",
      status: paymentIntent.status,
    });

    await payment.save();

    res.status(201).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      paymentIntent,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId, status } = req.body;

    const payment = await Payment.findOne({ paymentIntentId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = status;
    await payment.save();

    res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
