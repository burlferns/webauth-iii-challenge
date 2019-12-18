// ********************************************************
// Import Express and external middleware
// ********************************************************
const express = require('express');

// ********************************************************
// Set up express router
// ********************************************************
const router = express.Router();

// ********************************************************
// Import database access
// ********************************************************
const sdb = require('../data/helpers/userModel');

// ********************************************************
//Import custom middleware
// ********************************************************
const {restricted} = require('../middleware/custom');

// ********************************************************
// Export router
// ********************************************************
module.exports = router;

// ********************************************************
// GET /api/users  <--- for MVP
// ********************************************************
// router.get('/', restricted, (req, res) => {
//   sdb.find()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => res.send(err));
// });


// ********************************************************
// GET /api/users    <--- for Stretch
// ********************************************************
router.get('/', restricted, (req, res) => {

  console.log("in router.get - / & req.token:",req.token);

  sdb.findById(req.token.subject)
    .then(user=>{
      return sdb.findByColumn("department",user.department)
        .then(users=>{
          res.status(200).json(users);
        })
      // res.status(200).json(user);
    })
    .catch(err => res.send(err));
});

