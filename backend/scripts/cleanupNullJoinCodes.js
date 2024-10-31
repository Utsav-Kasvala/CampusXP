// scripts/cleanupNullJoinCodes.js

import dotenv from 'dotenv'; // Import dotenv
import mongoose from 'mongoose';
import Classroom from '../models/Classroom.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config(); // Load environment variables

const cleanupNullJoinCodes = async () => {
    try {
        const mongoURI = process.env.MONGO_URL; // Use the MONGO_URL variable
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined. Please check your .env file.");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Find classrooms with null joinCode
        const classrooms = await Classroom.find({ joinCode: null });

        if (classrooms.length === 0) {
            console.log("No classrooms with null joinCode found.");
            return;
        }

        for (let classroom of classrooms) {
            // Check if required fields are defined
            if (!classroom.professorName || !classroom.credits || !classroom.subjectName) {
                console.log(`Skipping classroom ID ${classroom._id} due to missing required fields.`);
                continue; // Skip this classroom
            }

            let uniqueCode;
            do {
                uniqueCode = uuidv4();
            } while (await Classroom.findOne({ joinCode: uniqueCode }));

            classroom.joinCode = uniqueCode;
            await classroom.save();
            console.log(`Updated classroom ID ${classroom._id} with new joinCode: ${uniqueCode}`);
        }
        console.log("Cleanup completed: All null joinCodes have been updated.");
    } catch (error) {
        console.error('Error during cleanup:', error.message || error);
    } finally {
        await mongoose.connection.close();
    }
};

// Execute the cleanup function
cleanupNullJoinCodes();
