// scripts/viewAllData.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../models/Student.js'; // Assuming you have a Student model
import Professor from '../models/Professor.js'; // Assuming you have a Professor model

dotenv.config(); // Load environment variables

const viewAllData = async () => {
    try {
        // Connect to MongoDB
        const mongoURI = process.env.MONGO_URL;
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined in the .env file.");
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Fetch and log all student data
        const students = await Student.find();
        console.log("All Students:");
        students.forEach(student => console.log(student));

        // Fetch and log all professor data
        const professors = await Professor.find();
        console.log("All Professors:");
        professors.forEach(professor => console.log(professor));

        console.log("Data viewing complete.");

    } catch (error) {
        console.error("Error viewing data from the database:", error.message || error);
    } finally {
        mongoose.connection.close(); // Ensure the database connection closes
    }
};

// Execute the function
viewAllData();
