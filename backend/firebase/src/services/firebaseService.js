const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('../config/firebaseConfig');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

module.exports = { createUser };
