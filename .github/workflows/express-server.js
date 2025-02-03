const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

// Käytetään CORSia tarvittavilla asetuksilla
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.static(path.join(__dirname, '..'))); // Palvelimella on pääsy juurihakemistoon

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // Viittaa index.html tiedostoon juurihakemistossa
});

// Lisätään virhelokitus
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
