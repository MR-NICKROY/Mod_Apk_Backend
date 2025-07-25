import express from "express";
import App from "../models/App.js";

const router = express.Router();

// ✅ Get all apps
router.get("/", async (req, res) => {
  try {
    const apps = await App.find().sort({ createdAt: -1 }); // latest first
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch apps", error });
  }
});

// ✅ Get single app details
router.get("/:id", async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "App not found" });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch app details", error });
  }
});

// ✅ Add a new app (Admin only)
router.post("/", async (req, res) => {
  try {
    const {
      title,
      currentVersion,
      oldVersions,
      publisher,
      requirements,
      category,
      size,
      rating,
      ratedBy,
      description,
      productImage,
      screenshots,
      downloadLink,
      password,
    } = req.body;

    // ✅ Check admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      console.log(process.env.ADMIN_PASSWORD);
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid admin password" });
    }

    // ✅ Validate required fields
    if (!title || !downloadLink) {
      return res
        .status(400)
        .json({ message: "Title and Download Link are required" });
    }

    // ✅ Validate screenshots (must be an array of 4)
    if (!Array.isArray(screenshots) || screenshots.length !== 4) {
      return res
        .status(400)
        .json({ message: "Exactly 4 screenshot URLs are required" });
    }

    // ✅ Create a new app document
    const newApp = new App({
      title,
      currentVersion,
      oldVersions,
      publisher,
      requirements,
      category,
      size,
      rating,
      ratedBy,
      description,
      productImage,
      screenshots,
      downloadLink,
    });

    // ✅ Save to database
    await newApp.save();

    res.status(201).json({ message: "App added successfully!", app: newApp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add app", error });
  }
});

export default router;
