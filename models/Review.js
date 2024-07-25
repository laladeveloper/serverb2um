import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: [true, "Please enter ID"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  ratings: Number,
  comment: String,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
