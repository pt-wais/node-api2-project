const express = require('express');
const blog = require('./API/blog.js')
const server = express();
server.use(express.json());


server.get('/', (req, res) => {
 res.send(
  `<h1>Welcome!</h1>`
 )
})

server.use('/api', blog)



module.exports = server;