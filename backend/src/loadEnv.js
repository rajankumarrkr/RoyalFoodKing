import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log("Environment variables loaded from:", path.resolve(__dirname, '../.env'));
if (!process.env.MONGO_URI) {
    console.error("WARNING: MONGO_URI not found in environment!");
}
