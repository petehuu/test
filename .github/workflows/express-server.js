const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 80; // Tai muu oikea portti

app.use(cors());

app.use(express.static(path.join(__dirname, '..', '..')));

// Lokitus saapuvista pyynnöistä
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', '..', 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`Error sending index.html: ${err}`);
            res.status(500).send('Something went wrong!');
        }
    });
});

// Virheenkäsittely
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
