import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function diagnose() {
    console.log('--- DIAGNOSIS START ---');

    // 1. Check DB Count
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const Food = mongoose.model('Food', new mongoose.Schema({}));
        const count = await Food.countDocuments();
        console.log(`- Database Food Count: ${count}`);
        await mongoose.disconnect();
    } catch (err) {
        console.error(`- DB Connect Error: ${err.message}`);
    }

    // 2. Check API Endpoint
    try {
        const res = await axios.get('http://localhost:5000/api/food');
        console.log(`- API GET /api/food status: ${res.status}`);
        console.log(`- API GET /api/food items returned: ${res.data.length}`);
    } catch (err) {
        console.error(`- API Endpoint Error: ${err.message}`);
    }

    process.exit();
}

diagnose();
