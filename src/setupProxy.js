// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/asset', {
        target: 'http://172.18.255.251:18091',
        changeOrigin: true,
    }));
    app.use(createProxyMiddleware('/api', {
        target: 'http://172.18.255.251:18091',
        changeOrigin: true,
    }));
};
