import express from "express";
import {
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsByName,
  getSellerProducts,
  newProduct,
} from "../controllers/productCtrl.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// localhost:4000/api/product/all
router.route("/all").get(getProducts);

// localhost:4000/api/product/all/seller
router.route("/all/seller").get(protect, getSellerProducts);

// localhost:4000/api/product/:id
router.route("/:id").get(getProduct);

// localhost:4000/api/product/name/:name
router.route("/name/:name").get(getProductsByName);

// localhost:4000/api/product/new
router.route("/new").post(protect, newProduct);

// localhost:4000/api/product/category/:category
router.route("/category/:category").get(getProductsByCategory);

// localhost:4000/api/product/update
// remiaining
router.route("/update").put();

export default router;
