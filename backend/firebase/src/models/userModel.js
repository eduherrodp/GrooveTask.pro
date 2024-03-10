// userModel.js
const { getDatabase, ref, set } = require('firebase/database');

function createUserInDatabase(uid, email, username) {
  const db = getDatabase();
  return set(ref(db, `users/${uid}`), {
    email: email,
    username: username,
    g_account: false,
  });
}

module.exports = { createUserInDatabase };