const http = require('http');
const app = require('./app');
const port = 8083;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Running server on port ${port}...`);
});