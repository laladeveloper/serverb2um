import express from "express";
import {
  getAllCategories,
  newCategory,
} from "../controllers/categoriesCtrl.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
// route  /api/category/all
router.route("/all").get(getAllCategories);
// route  /api/category/new
router.route("/new").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    
  ]),
  newCategory
);

export default router;
