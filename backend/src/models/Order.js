import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    customerDetails: {
      name: { type: String, required: true },
      mobile: { type: String, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
