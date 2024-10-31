// scripts/deleteAllData.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Classroom from '../models/Classroom.js';
import Student from '../models/Student.js'; // Assuming you have a Student model
import Professor from '../models/Professor.js'; // Assuming you have a Professor model

dotenv.config(); // Load environment variables

const deleteAllData = async () => {
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

        // Delete all data from each collection
        await Classroom.deleteMany({});
        console.log("All entries from the Classroom collection have been deleted.");

        await Student.deleteMany({});
        console.log("All entries from the Student collection have been deleted.");

        await Professor.deleteMany({});
        console.log("All entries from the Professor collection have been deleted.");

        console.log("Database cleanup complete.");

    } catch (error) {
        console.error("Error deleting data from the database:", error.message || error);
    } finally {
        mongoose.connection.close(); // Ensure the database connection closes
    }
};

// Execute the function
deleteAllData();
