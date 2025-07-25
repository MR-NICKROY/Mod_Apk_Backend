import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
  title: { type: String, required: true }, // App Title
  currentVersion: { type: String, default: "v1.0.0" },
  oldVersions: [String], // App Version
  publisher: String, // Publisher name
  requirements: String, // e.g. Android 8.0+, iOS 15+
  category: String, // Game, Social, Utility...
  size: String, // e.g. 120MB
  rating: Number, // e.g. 4.5
  ratedBy: Number, // e.g. 12000 users
  description: String, // Product description
  productImage: String, // Main image URL
  screenshots: [String], // Array of screenshot URLs
  downloadLink: String, // APK or app download link
  password: String, // For admin confirmation
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("App", appSchema);
