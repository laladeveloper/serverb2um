import express from 'express';
import {
  allUsers,
  createUser,
  deleteByUsername,
  getByUsername,
  getMe,
  loginUser,
  sellerReq,
} from "../controllers/userCtrl.js";
import {protect} from '../middleware/auth.js';

const router = express.Router();

// /api/user/all 
router.route("/all").get(allUsers);

// /api/user/new 
router.route("/new").post(createUser);

// /api/user/login
router.route("/login").post(loginUser);

// /api/user/me
router.route("/me").get(protect ,getMe);

// /api/user/regSeller
router.route("/regSeller").put(protect,sellerReq)

// /api/user/:username
router.route("/:username").get(getByUsername).delete(deleteByUsername)


export default router ;
