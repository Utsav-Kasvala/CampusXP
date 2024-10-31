// scripts/viewDatabaseData.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Classroom from '../models/Classroom.js'; // Import other models as needed

dotenv.config(); // Load environment variables

const viewDatabaseData = async () => {
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

        // Fetch data from Classroom collection
        const classrooms = await Classroom.find();
        console.log("Classroom Collection Data:");
        classrooms.forEach((classroom, index) => {
            console.log(`\nDocument ${index + 1}:`);
            console.log(`ID: ${classroom._id}`);
            console.log(`Subject Name: ${classroom.subjectName}`);
            console.log(`Credits: ${classroom.credits}`);
            console.log(`Professor Name: ${classroom.professorName}`);
            console.log(`Join Code: ${classroom.joinCode}`);
            console.log(`Students: ${JSON.stringify(classroom.students, null, 2)}`);
            console.log("-------------");
        });

        // Add more collections as needed:
        // const students = await Student.find();
        // console.log("Student Collection Data:", students);

        console.log("Database data retrieval complete.");

    } catch (error) {
        console.error("Error retrieving data from database:", error.message || error);
    } finally {
        mongoose.connection.close(); // Ensure the database connection closes
    }
};

// Execute the function
viewDatabaseData();
