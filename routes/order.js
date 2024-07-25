import { Router } from "express";
import { allorders, getOrderByID, myorders, newOrder } from "../controllers/orderCtrl.js";

const router = Router();

// localhost:4000/api/order/new
router.route("/new").post(newOrder);

// localhost:4000/api/order/all
router.route("/all").get(allorders);

// localhost:4000/api/order/all/:userid
router.route("/all/:user").get(myorders);

// localhost:4000/api/order/id/:id
router.route("/id/:id").get(getOrderByID);

export default router;
