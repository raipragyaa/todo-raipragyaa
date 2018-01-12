const http = require('http');
const PORT = 6000;
const app = require('./app.js');

let server = http.createServer(app);
server.listen(PORT);
server.on('error',e=>console.error('**error**',e.message));
console.log(`Listening on ${PORT}`);
