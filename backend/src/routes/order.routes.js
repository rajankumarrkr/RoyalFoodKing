import express from "express";
import {
    placeOrder,
    getOrders,
    updateOrderStatus,
    getOrdersByMobile,
} from "../controllers/order.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public route for placing order
router.post("/", placeOrder);
router.get("/my-orders", getOrdersByMobile);

// Admin routes
router.get("/", adminAuth, getOrders);
router.patch("/:id/status", adminAuth, updateOrderStatus);

export default router;
