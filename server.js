const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const fs = require("fs");
const app = express();

// Use Multer to handle binary file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.post("/extract-text", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file provided" });
        }

        // Convert buffer to text using Mammoth
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });

        res.json({ extractedText: result.value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
