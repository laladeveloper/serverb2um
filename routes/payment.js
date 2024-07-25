import express from "express";
import {
  createPaymentIntent,
  updatePaymentStatus,
} from "../controllers/payment.js";

const router = express.Router();

// localhost:4000/api/payment/new 
router.post("/new", createPaymentIntent);

// localhost:4000/api/payment/update
router.post("/update", updatePaymentStatus);

export default router;
