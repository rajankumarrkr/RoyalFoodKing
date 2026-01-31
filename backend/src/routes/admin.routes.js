import express from "express";
import multer from "multer";
import { adminLogin, uploadItem } from "../controllers/admin.controller.js";
import { storage } from "../config/cloudinary.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/login", adminLogin);
router.post("/upload", adminAuth, upload.single("image"), uploadItem);

export default router;
