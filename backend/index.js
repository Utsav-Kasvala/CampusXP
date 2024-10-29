import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import AuthRoutes from './routes/Authroutes.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions={
    origin:true
};

app.get('/',(req,res)=>{
    res.send("API is Working");
});

mongoose.get('strictQuery',false)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB database not connected:', err);
    }
};





app.use(express.json());  
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/auth',AuthRoutes);

connectDB();

app.listen(port,()=>{
    console.log("Server is running on port" +port)
});