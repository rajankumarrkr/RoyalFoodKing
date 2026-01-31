import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { addFood, getFoods, deleteFood, editFood } from "../controllers/food.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getFoods);
router.post("/", adminAuth, upload.single("image"), addFood);
router.delete("/:id", adminAuth, deleteFood);
router.patch("/:id", adminAuth, upload.single("image"), editFood);

export default router;
