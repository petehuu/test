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

app.use(express.static(path.join(__dirname)));

app.use('/proxy', createProxyMiddleware({
  //target: 'http://www.google.com',
  target: 'http://petehuu.github.io/proxy/index.html',  
  //target: 'http://hkp.maanmittauslaitos.fi/hkp/action?action_route=Coordinates&lat=59.98070939695573&lon=24.40447331965473&srs=EPSG:4326&targetSRS=EPSG:3067',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '',
  },
}));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`Error sending index.html: ${err}`);
            res.status(500).send('Something went wrong!');
        }
    });
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
