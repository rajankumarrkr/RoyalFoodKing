import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
    try {
        const { items, totalAmount, customerDetails } = req.body;

        const order = await Order.create({
            items,
            totalAmount,
            customerDetails,
        });

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            message: "Order status updated",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrdersByMobile = async (req, res) => {
    try {
        const { mobile } = req.query;
        if (!mobile) {
            return res.status(400).json({ message: "Mobile number is required" });
        }
        const orders = await Order.find({ "customerDetails.mobile": mobile }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
