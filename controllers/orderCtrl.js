import Order from "../models/order.js";

export const newOrder = async (req, res) => {
  const { user, product } = req.body;

  const order = new Order({
    user,
    product,
  });
  await order.save();

  res.status(201).json({
    success: true,
    message: "Order Created Successfully",
    order,
  });
};

export const allorders = async (req, res) => {
  const orders = await Order.find()
    .populate("user") // Populating the category field
    .populate("product");
  res.status(201).json({
    success: true,
    message: "Orders fetched Successfully",
    orders,
  });
};

export const myorders = async (req, res) => {
  const { user } = req.params;

  const orders = await Order.find({ user })
    .populate("user") // Populating the category field
    .populate("product");
  res.status(201).json({
    success: true,
    message: "My Orders fetched Successfully",
    orders,
  });
};
