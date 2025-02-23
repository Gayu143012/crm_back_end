import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
    try {
        if (!config.mongodbUrl) {
            throw new Error("MongoDB URL not set in environment variables");
        }
        await mongoose.connect(config.mongodbUrl);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

export default connectDB;