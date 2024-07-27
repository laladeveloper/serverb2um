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

// New function to update the image of a category
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const newImagePath = req.files.image[0]?.path;

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete the old image from Cloudinary
    const oldImagePublicID = category.icon.public_id;
    await cloudinary.v2.uploader.destroy(oldImagePublicID);

    // Upload the new image to Cloudinary
    const newImage = await uploadOnCloudinary(newImagePath, "categories");
    const newImageUrl = newImage.secure_url;
    const newImagePublicID = newImage.public_id;

    // Update the category with the new image details
    category.icon = {
      url: newImageUrl,
      public_id: newImagePublicID,
    };

    // Save the updated category
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category image updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating category image",
      error,
    });
  }
};
export const getCategoryById = async (req, res) => {
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


export const doesCategoryUIDExist = async (req, res) => {
  try {
    // Find all products
    const categoriesWithoutUID = await Category.find({ uid: { $exists: false } });


    res.status(200).json({
      success: true,
      message: `These ${categoriesWithoutUID.length} categories are without UIDs`,
      updatedCount: categoriesWithoutUID.length,
      categoriesWithoutUID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while geting categories UIDs",
      error: error.message,
    });
  }
};

export const assignUIDsToCategories = async (req, res) => {
  try {
    // Find all products
    const categoriesWithoutUID = await Category.find({ uid: { $exists: false } });

    // Iterate over each product and assign a UID
    for (const category of categoriesWithoutUID) {
      const uid = await generateUniqueUID(Category);
      category.uid = uid;
      await category.save();
    }

    res.status(200).json({
      success: true,
      message: `UIDs assigned to all ${categoriesWithoutUID.length} categories without UID`,
      updatedCount: categoriesWithoutUID.length,
      categoriesWithoutUID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while assigning UIDs",
      error: error.message,
    });
  }
};
