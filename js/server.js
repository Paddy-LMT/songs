const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // allow frontend requests

const songsDir = "C:/Users/SWARAJ/Desktop/spotify/songs/ncs";

// API to list all mp3 files
app.get('/songs', (req, res) => {
    fs.readdir(songsDir, (err, files) => {
        if (err) {
            console.error("Error reading directory", err);
            return res.status(500).send("Internal Server Error");
        }
        const mp3s = files.filter(file => file.endsWith(".mp3"));
        res.json(mp3s.map(file => ({
            name: file,
            url: `http://localhost:3000/songs/${file}`
        })));
    });
});

// Serve static songs
app.use('/songs', express.static(songsDir));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
