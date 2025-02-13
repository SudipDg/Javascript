const express = require("express");
const mammoth = require("mammoth");
const app = express();

app.use(express.json({ limit: "10mb" }));

app.post("/extract-text", async (req, res) => {
    try {
        if (!req.body.base64File) {
            return res.status(400).json({ error: "No file provided" });
        }

        // Convert base64 to Buffer
        const buffer = Buffer.from(req.body.base64File, "base64");

        // Extract text from .docx
        const result = await mammoth.extractRawText({ buffer: buffer });

        res.json({ extractedText: result.value });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
