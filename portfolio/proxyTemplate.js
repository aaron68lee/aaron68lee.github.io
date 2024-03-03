/*

// create proxy for CORS issues

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/predict',
    createProxyMiddleware({
      target: 'http://localhost:8000', // flask backend url
      changeOrigin: true,
    })
  );
};
*/