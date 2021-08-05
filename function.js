// function.js
const {https} = require('firebase-functions');
const {default: next} = require('next');
const config = require('./next.config');

let isDev = process.env.NODE_ENV !== 'production';
isDev = false;

const server = next({
  dev: isDev,
  conf: config,
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  console.log('[funciton.js nextjs] req url: ' + req.originalUrl);
  return server.prepare().then(() => nextjsHandle(req, res));
});
