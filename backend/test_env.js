import dotenv from 'dotenv';
dotenv.config();
console.log("TEST - MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");
