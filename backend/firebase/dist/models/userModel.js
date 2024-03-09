"use strict";

// userModel.js
var _require = require('firebase/database'),
  getDatabase = _require.getDatabase,
  ref = _require.ref,
  set = _require.set;
function createUserInDatabase(uid, email, username) {
  var db = getDatabase();
  return set(ref(db, "users/".concat(uid)), {
    email: email,
    username: username
  });
}
module.exports = {
  createUserInDatabase: createUserInDatabase
};