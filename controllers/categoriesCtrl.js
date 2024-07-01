import express from "express";
import Category from "../models/category.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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
  console.log(name, description);
  console.log(req.files.image);
  const imagePath = req.files.image[0]?.path;
  const img = await uploadOnCloudinary(imagePath);

  const imgUrl = img.secure_url;
  const imgPublicID = img.public_id;
  console.log(imgUrl);
  console.log(imgPublicID);
  try {
    const category = new Category({
      name,
      description,
      icon: {
        url: imgUrl,
        public_id: imgPublicID,
      },
    });
    await category.save();
    res.status(201).json({
      success: true,
      message: `${category.name} Created Successfully`,
      category,
    });
  } catch (error) {
    console.log(error);
  }
};
