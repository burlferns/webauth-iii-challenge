// ********************************************************
// Import Express and external middleware
// ********************************************************
const jwt = require("jsonwebtoken");

// ********************************************************
// Import constants
// ********************************************************
const {jwtSecret} = require('../consts');


// ********************************************************
// ********************************************************
module.exports = {
  defaultResponse, 
  logger, 
  restricted
};


// ********************************************************
// defaultResponse
// ********************************************************
function defaultResponse(req,res) {
  res.status(404).send(`<h1>You have used an unsupported URL</h1>`)
}


// ********************************************************
// logger
// ********************************************************
function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`);
  next();
}


// ********************************************************
// restricted
// ********************************************************
function restricted(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || jwtSecret;

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please try and login again" });
  }
};