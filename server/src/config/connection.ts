// Import the mongoose library to handle MongoDB connections
import mongoose from 'mongoose';

// Import dotenv to load environment variables from a .env file in development
import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

// Log the MongoDB URI to verify it's being read correctly from the environment
// (You might want to remove or comment this out in production for security)
console.log(process.env.MONGODB_URI);

// Connect to MongoDB using the URI from environment variables,
// or fall back to a local MongoDB instance if not defined
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Export the mongoose connection instance so it can be used elsewhere in the app
export default mongoose.connection;
