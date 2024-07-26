import express from "express";
import {
  getAllCategories,
  getAllProCategory,
  newCategory,
  updateCategory,
} from "../controllers/categoriesCtrl.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// route  /api/category/all
router.route("/all").get(getAllCategories);

// route  /api/category/new
router
  .route("/new")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), newCategory);

// route  /api/category/products
router.route("/products").get(getAllProCategory)

// route  /api/category/id/:id
router.route("/id/:id").put(updateCategory)


export default router;
