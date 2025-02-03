const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

// Käytetään CORSia tarvittavilla asetuksilla
app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.static(path.join(__dirname, '..', '..')));

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
