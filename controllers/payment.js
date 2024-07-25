import Stripe from "stripe";
import Payment from "../models/payment.js";
import Order from "../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { orderId, amount,currency } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency,
      metadata: { orderId: order._id.toString() },
    });

    const payment = new Payment({
      order: order._id,
      paymentIntentId: paymentIntent.id,
      amount,
      currency,
      status: paymentIntent.status,
    });

    await payment.save();

    res.status(201).json({ paymentIntent });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
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
