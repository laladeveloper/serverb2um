import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  // category: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Category",
  //   required: [true, "Please Enter Product Category"],
  // },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
    unique: false, // This enforces uniqueness for the "name" field
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [5, "Stock cannot exceed 5 characters"],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);

// export default Product;
