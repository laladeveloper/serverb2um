import mongoose from "mongoose";
import Category from "../models/category.js";
import Product from "../models/Product.js";
import generateUniqueUID from "../utils/uidGenerator.js";

// localhost:4000/api/product/new
export const newProduct = async (req, res) => {
  const { name, description, price, category, stock, location, time } =
    req.body;
  const seller = req.user;
  // console.log(seller);
  const uid = await generateUniqueUID(Product);
  const categoryID = await Category.findById(category);
  // console.log(categoryID);
  try {
    const product = new Product({
      uid,
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
  // res.send(`request reach`)
  const { id } = req.body;
  try {
    const userID = req?.user?.id || id ;

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
    // if (products.length === 0) {
    //   res.status(200).json({
    //     success: true,
    //     message: "There are no products found",
    //     products: [],
    //   });
    //   return;
    // }

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
  const { id } = req.params;
  // console.log(id);
  const product = await Product.findById(id)
    .populate("seller")
    .populate("category");
  if (!product) {
    return res.status(400).json({
      success: false,
      message: `Product not found, try later `,
    });
  }
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

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  const product = await Product.findById(id)
    .populate("seller")
    .populate("category");
  if (!product) {
    return res.status(400).json({
      success: false,
      message: `Product not found,Please try later `,
    });
  }
  if (product) {
    return res.status(200).json({
      success: true,
      message: `${product.name} is here `,
      product,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: `Product not found,Please try later `,
    });
  }
};



export const doesUIDExist = async (req, res) => {
  try {
    // Find all products
    const productsWithoutUID = await Product.find({ uid: { $exists: false } });

    // Iterate over each product and assign a UID
    // for (const product of productsWithoutUID) {
    //   const uid = await generateUniqueUID(Product);
    //   product.uid = uid;
    //   await product.save();
    // }

    res.status(200).json({
      success: true,
      message: 'UIDs assigned to all products without UID',
      updatedCount: productsWithoutUID.length,
      productsWithoutUID
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while assigning UIDs',
      error: error.message,
    });
  }
};

export const assignUIDsToProducts = async (req, res) => {
  try {
    // Find all products
    const productsWithoutUID = await Product.find({ uid: { $exists: false } });

    // Iterate over each product and assign a UID
    for (const product of productsWithoutUID) {
      const uid = await generateUniqueUID(Product);
      product.uid = uid;
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: 'UIDs assigned to all products without UID',
      updatedCount: productsWithoutUID.length,
      productsWithoutUID
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while assigning UIDs',
      error: error.message,
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
        message: `products fetched by category successfully`,
        products,
      });
    } else {
      try {
        const products = await Category.find({ category });
        res.status(200).json({
          success: true,
          message: `products fetched by category successfully`,
          products,
        });
      } catch (error) {
        console.log(`error in productctrl 139`);
        console.log(error);
        res.send(200).json({
          success: true,
          message: `products not found`,
        });
      }
    }
  } catch (error) {
    console.log(`there is an error while getprodcuts`);
    console.log(error);
  }
};

export const getProductsByCategoryName = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  // const objectId = new mongoose.Types.ObjectId(category);
  try {
    const category = await Category.find({ name });

    if (category) {
      const products = await Product.find({ category })
        .populate("category") // Populating the category field
        .populate("seller");

      res.status(200).json({
        success: true,
        message: `products fetched by category successfully`,
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
