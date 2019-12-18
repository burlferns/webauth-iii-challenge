// ******************************************************
// Import Express and external middleware
// ******************************************************
const express = require('express');
const helmet = require("helmet");


// ******************************************************
// Import custom middleware
// ******************************************************
const {defaultResponse, logger} = require('./middleware/custom');


// ******************************************************
// Import specific Routers
// ******************************************************
const authRouter = require("./auth/authRouter"); 
const userRouter = require("./user/userRouter"); 


// ******************************************************
// Create server
// ******************************************************
const server = express();


// ******************************************************
// Use global middleware 
// ******************************************************
server.use(helmet());
server.use(express.json());
server.use(logger);


// ******************************************************
// Specify general endpoints
// ******************************************************
server.get('/', (req, res) => {
  res.send(`<h2>This is for webauth-i-challenge </h2>`);
});


// ******************************************************
// Use specific Routers
// ******************************************************
server.use("/api", authRouter); 
server.use("/api/users", userRouter); 


// ******************************************************
// ******************************************************
server.use(defaultResponse);
module.exports = server;