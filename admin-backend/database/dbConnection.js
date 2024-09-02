import mongoose from "mongoose";

export const dbConnection = () => {
    // Connect to MongoDB using Mongoose
    mongoose.connect(process.env.MONGO_URL, { // Use the correct environment variable for MongoDB connection URL
        dbName: "job_Seeking" // Specify the database name you want to connect to
    })
    .then(() => {
        // Log success message if connection is successful
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        // Log error message if connection fails
        console.log(`MongoDB connection failed: ${err}`);
    });
}
