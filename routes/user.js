import express from 'express';
import { allUsers, createRandomUsers, createUser, getById, getByUsername, getMe, loginUser } from '../controllers/userCtrl.js';
import {protect} from '../middleware/auth.js';

const router = express.Router();

// /api/user/all 
router.route("/all").get(allUsers);

// /api/user/all 
// router.route("/").get(allUsers);

// /api/user/new 
router.route("/new").post(createUser);
// /api/user/random/:count
router.route("/random/:count").post(createRandomUsers);

// /api/user/login
router.route("/login").post(loginUser);

// /api/user/me
router.route("/me").get(protect ,getMe);

// // /api/user/:Id
// router.route("/:id").get(getById)

// /api/user/:username
router.route("/:username").get(getByUsername)


export default router ;
