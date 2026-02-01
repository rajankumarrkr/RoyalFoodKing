import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String
}, { timestamps: true });

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: String,
        email: String,
        address: String
    },
    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        },
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

async function check() {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");
        const foodsCount = await Food.countDocuments();
        const ordersCount = await Order.countDocuments();
        console.log('Foods found:', foodsCount);
        console.log('Orders found:', ordersCount);

        if (foodsCount > 0) {
            const food = await Food.findOne();
            console.log('First food name:', food.name);
        }

        if (ordersCount > 0) {
            const orders = await Order.find();
            orders.forEach((o, i) => {
                if (!o.customerDetails) {
                    console.log(`Order ${i} (${o._id}) has MISSING customerDetails!`);
                } else {
                    console.log(`Order ${i} (${o._id}) has details: ${o.customerDetails.name}`);
                }
            });
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

check();
