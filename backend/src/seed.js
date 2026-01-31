import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from './models/Food.js';

dotenv.config({ path: './.env' });

const foods = [
    // Veg - 18 items
    { name: 'Royal Paneer Tikka', price: 299, category: 'Veg', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800' },
    { name: 'Shahi Paneer', price: 349, category: 'Veg', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800' },
    { name: 'Veg Dum Biryani', price: 249, category: 'Veg', image: 'https://images.unsplash.com/photo-1563379091339-03b17af4a4f9?q=80&w=800' },
    { name: 'Chole Bhature', price: 199, category: 'Veg', image: 'https://images.unsplash.com/photo-1626132646529-5006375bc197?q=80&w=800' },
    { name: 'Dal Makhani', price: 279, category: 'Veg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800' },
    { name: 'Malai Kofta', price: 319, category: 'Veg', image: 'https://images.unsplash.com/photo-1626509653295-4f582c3dc97d?q=80&w=800' },
    { name: 'Paneer Butter Masala', price: 329, category: 'Veg', image: 'https://images.unsplash.com/photo-1603894584134-f132f2ecf99a?q=80&w=800' },
    { name: 'Mixed Veg Curry', price: 229, category: 'Veg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800' },
    { name: 'Aloo Gobi', price: 189, category: 'Veg', image: 'https://images.unsplash.com/photo-1589676646625-f55302216b32?q=80&w=800' },
    { name: 'Baingan Bharta', price: 219, category: 'Veg', image: 'https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?q=80&w=800' },
    { name: 'Rajma Masala', price: 199, category: 'Veg', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800' },
    { name: 'Palak Paneer', price: 289, category: 'Veg', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1ce7c?q=80&w=800' },
    { name: 'Mushroom Masala', price: 299, category: 'Veg', image: 'https://images.unsplash.com/photo-1512058560366-cd2427bb5861?q=80&w=800' },
    { name: 'Kadhai Paneer', price: 309, category: 'Veg', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800' },
    { name: 'Veg Kabab', price: 179, category: 'Veg', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800' },
    { name: 'Gobi 65', price: 169, category: 'Veg', image: 'https://images.unsplash.com/photo-1626509653295-4f582c3dc97d?q=80&w=800' },
    { name: 'Paneer Kofta', price: 329, category: 'Veg', image: 'https://images.unsplash.com/photo-1603894584134-f132f2ecf99a?q=80&w=800' },
    { name: 'Veg Pulao', price: 209, category: 'Veg', image: 'https://images.unsplash.com/photo-1563379091339-03b17af4a4f9?q=80&w=800' },

    // Non-Veg - 16 items
    { name: 'Butter Chicken', price: 399, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1603894584134-f132f2ecf99a?q=80&w=800' },
    { name: 'Chicken Biryani', price: 349, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1563379091339-03b17af4a4f9?q=80&w=800' },
    { name: 'Mutton Rogan Josh', price: 499, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800' },
    { name: 'Chicken Tikka', price: 329, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800' },
    { name: 'Fish Curry', price: 379, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800' },
    { name: 'Chicken Manchurian', price: 299, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800' },
    { name: 'Egg Curry', price: 199, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800' },
    { name: 'Chicken Korma', price: 389, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1603894584134-f132f2ecf99a?q=80&w=800' },
    { name: 'Mutton Biryani', price: 449, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1563379091339-03b17af4a4f9?q=80&w=800' },
    { name: 'Chicken 65', price: 279, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1626509653295-4f582c3dc97d?q=80&w=800' },
    { name: 'Tandoori Chicken', price: 359, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800' },
    { name: 'Fish Tikka', price: 389, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800' },
    { name: 'Chicken Shawarma', price: 179, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800' },
    { name: 'Apolo Fish', price: 349, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800' },
    { name: 'Mutton Fry', price: 429, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800' },
    { name: 'Chicken Afghani', price: 369, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800' },

    // Fast Food - 16 items
    { name: 'Royal Cheese Burger', price: 199, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800' },
    { name: 'Double Patty Veg Burger', price: 219, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800' },
    { name: 'Margherita Pizza', price: 299, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?q=80&w=800' },
    { name: 'King Size Pepperoni Pizza', price: 449, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800' },
    { name: 'Peri Peri French Fries', price: 129, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1630384066202-187c9625365d?q=80&w=800' },
    { name: 'White Sauce Pasta', price: 249, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1645112481338-30145012743b?q=80&w=800' },
    { name: 'Spicy Red Sauce Pasta', price: 249, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1563379966870-cc9990bf0381?q=80&w=800' },
    { name: 'Chilli Paneer Dry', price: 279, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800' },
    { name: 'Schezwan Noodles', price: 209, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800' },
    { name: 'Veg Momos (10 pcs)', price: 149, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800' },
    { name: 'Paneer Grilled Sandwich', price: 159, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800' },
    { name: 'Club House Sandwich', price: 189, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800' },
    { name: 'Chilli Garlic Bread', price: 139, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=800' },
    { name: 'Nachos with Cheese Dip', price: 179, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=800' },
    { name: 'Veg Crispy', price: 229, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1626509653295-4f582c3dc97d?q=80&w=800' },
    { name: 'Spring Rolls', price: 159, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1544333346-64663c614532?q=80&w=800' },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Seed: Connected to MongoDB');

        // Clear existing foods (optional, but requested to "add 50 items", so I'll just insert)
        // await Food.deleteMany({});

        await Food.insertMany(foods);
        console.log('Seed: 50 Food items added successfully');

        process.exit();
    } catch (error) {
        console.error('Seed Error:', error);
        process.exit(1);
    }
};

seedDB();
