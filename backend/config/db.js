import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://commerce:commerce@commerce.kpjgl.mongodb.net/?retryWrites=true&w=majority&appName=commerce");
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};
