// scripts/deleteAllData.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Classroom from '../models/Classroom.js'; // Import other models as needed

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

        // Delete all data from the Classroom collection
        await Classroom.deleteMany({});
        console.log("All entries from the Classroom collection have been deleted.");

        // Add more collections as needed:
        // await Student.deleteMany({});
        // console.log("All entries from the Student collection have been deleted.");

        console.log("Database cleanup complete.");

    } catch (error) {
        console.error("Error deleting data from database:", error.message || error);
    } finally {
        mongoose.connection.close(); // Ensure the database connection closes
    }
};

// Execute the function
deleteAllData();
