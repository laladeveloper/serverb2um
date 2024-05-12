import { config } from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    minLength: [4, "Username should greater than 4 characters"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minLength: [8, "Password should be greater than 8 characters"],
  },
  role: {
    type: String,
    default: "user",
  },
  balance: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  cnic: {
    type: String,
  },
  passport: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  telegram: {
    type: String,
  },
  product: [],
  products: {
    name: String,
    price: Number,
  },
  isVerifiedSeller: {
    type: Boolean,
    default: false,
  },
  isVerifiedUser: {
    type: Boolean,
    default: false,
  },
  cnicFront: [
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
  cnicRear: [
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
});
const secretKey = process.env.JWT_SECRET || "your_secret_key_here";
// JWT TOKEN
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, secretKey, {
    expiresIn: process.env.JWT_EXPIRE + 30 * 24 * 60 * 60 * 1000,
  });
};

const User = mongoose.model("User", userSchema);
export default User;
