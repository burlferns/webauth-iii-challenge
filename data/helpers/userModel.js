const db = require('../dbConfig');

module.exports = {
  add,
  findByUname,
  findById,
  find,
  findByColumn
};

// ******************************************************
// add
// ******************************************************
function add(user) {
  return db('users')
    .insert(user,"id")
    .then(ids=>{
      return findById(ids[0]);
    });
}

// ******************************************************
// findById
// ******************************************************
function findById(id) {
  return db("users")
    .select("id","username","department")
    .where("id","=",id)
    .first();
}

// ******************************************************
// findByUname
// ******************************************************
function findByUname(username) {
  // console.log("In findByUname",username);
  return db("users")
    .select("id", "username", "password") // make sure to return the password
    // .select("id")
    .where('username','=',username)
    .first();
}

// ******************************************************
// find
// ******************************************************
function find() {
  return db("users").select("id", "username", "department");
}


// ******************************************************
// findByColumn
// ******************************************************
function findByColumn(colName,coldata) {
  return db("users")
    .select("id", "username", "department")
    .where(colName,'=',coldata);
}

