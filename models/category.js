import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Category Model
const CategorySchema = new Schema({
  uid: {
    type: String,
    required: [true, "Please enter ID"],
  },
  name: { type: String, required: true, unique: true },
  description: String,
  icon: {
    url: String,
    public_id: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
