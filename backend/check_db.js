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

async function check() {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");
        const foods = await Food.find({});
        console.log("Foods found:", foods.length);
        if (foods.length > 0) {
            console.log("First food name:", foods[0].name);
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

check();
