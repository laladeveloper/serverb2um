import express from "express";
import Category from "../models/category.js";
import Product from "../models/Product.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import generateUniqueUID from "../utils/uidGenerator.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      message: `There are following categories`,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `there is following error`,
      error,
    });
  }
};

export const newCategory = async (req, res) => {
  const { name, description } = req.body;
  const uid =await generateUniqueUID(Category)
  const imagePath = req.files.image[0]?.path;
  console.log(imagePath);
  const img = await uploadOnCloudinary(imagePath, "categories");
  // console.log(`cloundinay response ${img}`);
  const imgUrl = img.secure_url;
  const imgPublicID = img.public_id;
  // console.log(imgUrl);
  // console.log(imgPublicID);
  try {
    const category = new Category({
      uid,
      name,
      description,
      icon: {
        url: imgUrl,
        public_id: imgPublicID,
      },
    });
    await category.save();
    console.log(category);
    res.status(201).json({
      success: true,
      message: `${category.name} Created Successfully`,
      category,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProCategory = async (req, res) => {
  try {
    const products = await Product.find();
     // Extract unique category IDs
     const categoryIds = [...new Set(products.map((product) => product.category))];
     
     // Find categories based on unique IDs
     const categories = await Category.find({ _id: { $in: categoryIds } });
    //  console.log(categories);
 

    res.status(200).json({
      success: true,
      message: `There are following categories`,
      categories,
      categoryIds
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `there is following error`,
      error,
    });
  }
};
