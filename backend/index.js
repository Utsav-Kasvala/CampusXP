//import studentRoutes from "./routes/studentRoutes.js";
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv
import cors from 'cors'; // Import CORS
import authRoutes from './routes/Authroutes.js'; // Adjust according to your file structure
import classroomRoutes from './routes/ClassroomRoutes.js';
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/classrooms', classroomRoutes); 
//app.use("/api", studentRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
