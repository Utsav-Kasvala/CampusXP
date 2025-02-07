import { submitAssignment } from './Controllers/AssignmentController.js';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv
import cors from 'cors'; // Import CORS
import authRoutes from './routes/Authroutes.js'; // Adjust according to your file structure
import classroomRoutes from './routes/ClassroomRoutes.js';
import timeTableRoutes from './routes/TimeTableRoutes.js';
import attendanceRoutes from './routes/Attendance.js';
import assignmentRoute from './routes/AssignmentRoutes.js';
import leaderboardRoute from './routes/Lbroutes.js'
import studentProfileRoute from './routes/StudentProfileRoutes.js'
import studentroutes from './routes/studentRoutes.js'
import quizroutes from './routes/QuizRoutes.js'
import profProfileRoute from './routes/ProfProfileRoutes.js'
import resetPasswordRoute from './routes/ResetPasswordRoute.js'
dotenv.config(); // Load environment variables

const app = express();
// Allow specific origins
const corsOptions = {
    origin: ["https://campus-xp-ywga.vercel.app"], // Add allowed frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and auth headers
};
  
app.use(cors(corsOptions));
app.get('/',(req,res)=>{
    res.send("API is Working");
});
app.use(express.json());

// Define your routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/classrooms', classroomRoutes);
app.use('/api/v1/timeTable', timeTableRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/assignments',assignmentRoute);
app.use('/api/v1/leaderboard',leaderboardRoute);
app.use('/api/v1/studentProfile',studentProfileRoute);
app.use('/api/v1/profProfile',profProfileRoute);
app.use('/api/v1/students',studentroutes);
app.use('/api/v1/quiz',quizroutes);
app.use('/api/v1/reset',resetPasswordRoute)


// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
