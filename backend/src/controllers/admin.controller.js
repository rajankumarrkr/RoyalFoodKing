import jwt from "jsonwebtoken";
import Food from "../models/Food.js";

export const adminLogin = (req, res) => {
  const { userId, password } = req.body;

  if (
    userId !== process.env.ADMIN_USER_ID ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
  });
};

export const uploadItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const food = await Food.create({
      name,
      price,
      category,
      image: req.file.path,
    });

    res.status(201).json({
      message: "Item uploaded successfully",
      data: food,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
