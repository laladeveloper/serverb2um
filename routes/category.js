import express from "express";
import {
  assignUIDsToCategories,
  doesCategoryUIDExist,
  getAllCategories,
  getAllProCategory,
  newCategory,
  updateCategory,
} from "../controllers/categoriesCtrl.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// route  /api/category/all
router.route("/all").get(getAllCategories);

// route  /api/category/all/uid/no
router.route("/all/uid/no").get(doesCategoryUIDExist);

// route  /api/category/all/uid/asign
router.route("/all/uid/asign").get(assignUIDsToCategories);

// route  /api/category/new
router
  .route("/new")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), newCategory);

// route  /api/category/products
router.route("/products").get(getAllProCategory)

// route  /api/category/id/:id
router.route("/id/:id").put(updateCategory)


export default router;
