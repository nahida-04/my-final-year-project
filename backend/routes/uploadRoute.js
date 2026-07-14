/*import express from "express";
import upload from "../middleware/upload.js"; // <-- your multer config

const router = express.Router();

// Single file upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

export default router;  */

import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // save in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload endpoint (multiple fields)
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      console.log("Files:", req.files);
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      // Build URLs for uploaded images
      const images = Object.keys(req.files).map((key) => {
        return `${baseUrl}/uploads/${req.files[key][0].filename}`;
      });

      res.json({
        success: true,
        message: "Files uploaded successfully ",
        urls: images,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Upload failed " });
    }
  }
);

export default router;

