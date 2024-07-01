import express from "express";
import {
  allUsers,
  createUser,
  deleteByUsername,
  getByUsername,
  getMe,
  loginUser,
  reqSellers,
  reqSellersAcp,
  sellerReq,
  updateMe,
} from "../controllers/userCtrl.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// /api/user/all
router.route("/all").get(allUsers);

// /api/user/new
router.route("/new").post( upload.single("avatar"), createUser);

// /api/user/login
router.route("/login").post(loginUser);
 
// /api/user/me
router.route("/me").get(protect, getMe).put(protect, updateMe);

// /api/user/regSeller
router.route("/regSeller").put(
  protect,
  upload.fields([
    { name: "frontID", maxCount: 1 },
    { name: "rearID", maxCount: 1 },
  ]),
  sellerReq
);

// /api/user/regSeller
router.route("/regSeller/:id").put(
  
  upload.fields([
    { name: "frontID", maxCount: 1 },
    { name: "rearID", maxCount: 1 },
  ]),
  sellerReq
);

// /api/user/reqSeller
router.route("/reqSeller").get(protect, reqSellers);

// /api/user/reqSeller/:id
router.route("/reqSeller/:id").put(reqSellersAcp);

// /api/user/:username
router.route("/:username").get(getByUsername).delete(deleteByUsername);

export default router;
