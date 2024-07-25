import Order from "../models/order.js";

export const newOrder = async (req, res) => {
  const { user, product, seller, quantity } = req.body;
  // console.log(user, product, seller,quantity);
  if ((!user, !product, !seller)) {
    return res.status(400).json({
      success: false,
      message: "Something Missing, Please Try Later",
    });
  }
  const order = new Order({
    user,
    product,
    seller,
    quantity,
  });
  await order.save();

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
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

export const getOrderByID = async (req, res) => {
  const { id } = req.params;

  const orders = await Order.findById(id)
    .populate("user") // Populating the category field
    .populate("product");
  res.status(201).json({
    success: true,
    message: " Order fetched Successfully",
    orders,
  });
};
