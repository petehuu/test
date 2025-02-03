const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 8080;

// Käytetään CORSia tarvittavilla asetuksilla
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

// Staattisten tiedostojen tarjoaminen
app.use(express.static(path.join(__dirname, '..', '..')));

// Proxy-middleware
app.use('/api', createProxyMiddleware({ 
  target: 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: {'^/api' : ''}
}));

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
