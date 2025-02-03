const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(cors());

// Proxy-middleware
app.use('/proxy', createProxyMiddleware({
  target: 'http://www.google.com', // Perusosoite
  changeOrigin: true,
  pathRewrite: (path, req) => path.replace('/proxy/', '/'),
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
