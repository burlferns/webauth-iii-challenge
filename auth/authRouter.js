// ********************************************************
// Import Express and external middleware
// ********************************************************
const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ********************************************************
// Set up express router
// ********************************************************
const router = express.Router();

// ********************************************************
// Import database access
// ********************************************************
const sdb = require('../data/helpers/userModel');

// ********************************************************
// Import custom middleware
// ********************************************************
// None at this time


// ********************************************************
// Import constants
// ********************************************************
const {jwtSecret} = require('../consts');


// ********************************************************
// Export router
// ********************************************************
module.exports = router;


// ********************************************************
// POST /api/register
// ********************************************************
router.post('/register',(req,res)=>{
  let userInfo = req.body;

  // hash the password
  // 14 is the number of rounds (2^14) - iterations
  const hash = bcrypt.hashSync(userInfo.password, 14);
  
  // override the plain text password with the hash
  userInfo.password = hash;

  sdb.add(userInfo)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });

})

// ********************************************************
// POST /api/login
// ********************************************************
router.post("/login",(req,res)=>{
  let {username, password} =req.body;
  // console.log("In router.post",username,password);
  sdb.findByUname(username)
    .then(user=>{
      if (user && bcrypt.compareSync(password, user.password)) {

      //Create a token
      const token = signToken(user);

        res.status(200).json({ token, message: "Logged In" });
      }
      else {
        res.status(401).json({ message: "You shall not pass" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})


// ********************************************************
// signToken
// ********************************************************
function signToken(user) {
  const payload = {
    subject: user.id
  };

  const secret = process.env.JWT_SECRET || jwtSecret;

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options); 
}