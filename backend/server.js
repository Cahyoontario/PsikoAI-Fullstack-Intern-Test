const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let results = []; // Penyimpanan sederhana 

// Endpoint untuk menyimpan hasil
app.post('/api/results', (req, res) => {
    const { score, category } = req.body;
    results.push({ id: Date.now(), score, category });
    res.status(201).send({ message: "Saved!" });
});

// Admin endpoint (Bonus) [cite: 17]
app.get('/api/results', (req, res) => res.json(results));

app.listen(5000, () => console.log("Server running on port 5000"));