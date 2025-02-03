const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, '..'))); // Viittaa projektin juurihakemistoon

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // Viittaa index.html tiedostoon projektin juurihakemistossa
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
