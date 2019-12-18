const bcrypt = require("bcryptjs");

const {hashRounds} = require('../../consts');

exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          username: 'Harry',
          password: bcrypt.hashSync('qaz', hashRounds),
          department: 'Math'
        },
        { 
          username: 'Sally',
          password: bcrypt.hashSync('wsx', hashRounds),
          department: 'Chemistry'
        },
        { 
          username: 'Rachel',
          password: bcrypt.hashSync('edc', hashRounds),
          department: 'Math'
        },
        { 
          username: 'Phoebe',
          password: bcrypt.hashSync('rfv', hashRounds),
          department: 'Chemistry'
        },
        { 
          username: 'Chandler',
          password: bcrypt.hashSync('tgb', hashRounds),
          department: 'Math'
        },
      ]);
    });
};

