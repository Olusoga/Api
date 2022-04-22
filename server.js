const http = require('http');
const dotenvnv = require('dotenv')
const app =require('./app');
const port = process.env.PORT || 3001;
require('dotenv').config();

const server = http.createServer(app);

server.listen(port, console.log('submitnode '));