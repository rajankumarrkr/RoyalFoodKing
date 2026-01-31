import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import foodRoutes from "./routes/food.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Royal Food King API is running");
});

export default app;
