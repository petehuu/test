const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname)));

app.use('/proxy', createProxyMiddleware({
  target: 'http://www.google.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '',
  },
}));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`Error sending index.html: ${err}`);
            res.status(500).send('Something went wrong!');
        }
    });
});

app.use((err, req, res, next) => {
    console.error(`Error handling request for ${req.method} ${req.url}:`, err);
    res.status(500).send('Something went wrong!');
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
