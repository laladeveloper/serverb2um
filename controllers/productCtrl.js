import mongoose from "mongoose";
import Category from "../models/category.js";
import { Product } from "../models/product.js";

// localhost:4000/api/product/new
export const newProduct = async (req, res) => {
  const { name, description, price, category, stock, location, time } =
    req.body;
  const seller = req.user;
  // console.log(seller);
  const categoryID = await Category.findById(category);
  // console.log(categoryID);
  try {
    const product = new Product({
      name,
      description,
      price,
      category: categoryID,
      stock,
      seller,
      location,
      deliverIn: time,
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: `Congratulations ${product.name} listed Successfully `,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `there is error `,
      error,
    });
  }
};

// localhost:4000/api/product/all
export const getProducts = async (req, res) => {
  // const products = await Product.find();
  const products = await Product.find()
    .populate("category") // Populating the category field
    .populate("seller"); // Populating the seller field
  if (!products) {
    res.status(200).json({
      success: true,
      message: `There are no products found `,
    });
  } else {
    res.status(200).json({
      success: true,
      message: `All products `,
      products,
    });
  }
};

// localhost:4000/api/product/all/seller
export const getSellerProducts = async (req, res) => {
  try {
    const userID = req?.user?.id;

    // Ensure userID is defined
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find products where the seller field matches the userID
    const products = await Product.find({ seller: userID });

    // Check if products exist
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "There are no products found",
        products: [],
      });
    }

    // Return found products
    res.status(200).json({
      success: true,
      message: "All products",
      products,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById({ id });
  if (product) {
    return res.status(200).json({
      success: true,
      message: `${product.name} is here `,
      product,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: `Product not found, try later `,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  // const objectId = new mongoose.Types.ObjectId(category);
  try {
    const products = await Product.find({ category })
      .populate("category") // Populating the category field
      .populate("seller");
    if (products) {
      res.status(200).json({
        success: true,
        message: `products fetched successfully`,
        products,
      });
    } else {
      res.send(200).json({
        success: true,
        message: `products not found`,
      });
    }
  } catch (error) {
    console.log(`there is an error while getprodcuts`);
    console.log(error);
  }
};

export const getProductsByName = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  // const objectId = new mongoose.Types.ObjectId(category);
  try {
    const products = await Product.find({ name })
      .populate("category") // Populating the category field
      .populate("seller");
    if (products) {
      res.status(200).json({
        success: true,
        message: `products fetched successfully`,
        products,
      });
    } else {
      res.send(200).json({
        success: true,
        message: `products not found`,
      });
    }
  } catch (error) {
    console.log(`there is an error while getprodcuts`);
    console.log(error);
  }
};
