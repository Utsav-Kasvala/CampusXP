// Test database connection
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connection successful!");
    } catch (error) {
        console.error("Database connection failed:", error);
    } finally {
        mongoose.connection.close(); // Close connection after test
    }
};

testConnection();
