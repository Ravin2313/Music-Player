const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static audio files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

// Get all songs route
app.get("/songs", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read files" });
    }
    const audioFiles = files.filter((file) =>
      /\.(mp3|wav|ogg|m4a)$/i.test(file)
    );
    const fileLinks = audioFiles.map((filename) => ({
      name: filename,
      url: `/uploads/${filename}`,
    }));
    res.json(fileLinks);
  });
});

// Optional: redirect root to upload.html
app.get("/", (req, res) => {
  res.redirect("/upload.html");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
