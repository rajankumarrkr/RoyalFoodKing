import Food from "../models/Food.js";

export const addFood = async (req, res) => {
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

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFoods = async (req, res) => {
  try {
    console.log("GET /api/food request received");
    const foods = await Food.find().sort({ createdAt: -1 });
    console.log(`Found ${foods.length} foods in DB`);
    res.json(foods);
  } catch (error) {
    console.error("Error in getFoods:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    let updateData = { name, price, category };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const food = await Food.findByIdAndUpdate(id, updateData, { new: true });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food updated successfully", food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
