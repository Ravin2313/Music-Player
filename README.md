# 🎵 Music Player Web App

A full-stack music player web application where users can upload, manage, and play their favorite audio tracks. Built using **Node.js**, **Express**, and **HTML/CSS/JavaScript**, this project features a backend-focused architecture with API support for audio streaming and file management.

## 🔍 Overview

The Music Player is designed to provide a basic online audio platform. Users can upload songs, store them in a structured server-side folder (`/uploads`), and stream audio from the backend. The architecture is modular with a clean separation of backend logic (routing, file handling) and frontend presentation (expected via HTML/CSS/JS).

## 🔧 Key Features

- Upload and manage MP3/audio files  
- Audio file serving via Express backend  
- RESTful API routing (organized in `/routes`)  
- Environment variable handling using `.env`  
- File handling with **Multer** (inferred)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Upload Handling:** Multer (assumed)
- **Runtime:** npm

## 📁 Folder Structure

```
Music Player/
├── .env                  # Config file (PORT, paths)
├── backend/
│   ├── public/           # Static files (e.g., player UI)
│   ├── routes/           # API routes for upload/play
│   ├── uploads/          # Uploaded audio files
│   ├── server.js         # Express server setup
│   └── package.json      # Dependencies
└── Frontend/             # (Currently empty)
```

## ⚙️ Functional Flow

1. Frontend opens the music player interface (to be implemented).
2. User uploads audio via a POST API.
3. Backend processes and stores files.
4. Client requests music, which is served dynamically.

## 🚀 Setup Instructions

**Requirements:** Node.js, npm

```bash
cd backend
npm install
```

Create a `.env` file with:
```env
PORT=3000
UPLOAD_DIR=uploads
```

Then start the backend:
```bash
node server.js
```

## ✅ Use Cases

Ideal for students, interns, or full-stack beginners who want to build a media-handling app with file upload, REST API integration, and modular Node.js architecture.

---

**Developed by Ravindra Kumar Shriwas – MCA Student, ABV University, Bilaspur**
