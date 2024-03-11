// userController.js
const { createUser } = require('../services/firebaseService');
const { createUserInDatabase } = require('../models/userModel');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, get, set } = require('firebase/database');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

const secretKey = 'ZxWXV@rcUiRG9BU#s2T323V55'; // Simplicidad
const auth = getAuth();


// generateToken function is used to generate a session token
function generateToken(user) {
  return jwt.sign({ userId: user }, secretKey, { expiresIn: '1h' }); // Expires in 1 hour
}

// Controller to register a new user
async function signup(req, res) {
  const { email, password, username } = req.body;
  const { googleCode } = '';

  try {
    const user = await createUser(email, password);
    // also we need to add that user still don't vinculate their google account for using task api
    await createUserInDatabase(user.uid, email, username, googleCode , false);

    console.log("User registered:", user);
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Controller to log in a user
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    const user_ = user.user.uid;
    console.log("UID:", user_);

    // Generate token de sessión
    const token = generateToken({ id: user_ });

    // Send responde to the client
    res.status(200).json({ token, user_ });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: error.message });
  }
}

// Controller to log out a user
async function logout(req, res) {
  res.clearCookie('token');
  res.clearCookie('user_');
  res.status(200).json({ message: "User logged out successfully" });
  console.log("User logged out");
}

// Get user information
async function getUserInfo(req, res) {
  try {
    const { uid } = req.params;
    console.log("UID:", uid);

    // get refernece to the user in the database
    const userRef = ref(getDatabase(), `users/${uid}`);

    // Get user information from the database
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (error) {
    console.error("Error getting user info:", error.message);
    res.status(500).json({ error: error.message });
  }
}

const oAuth2Client = new google.auth.OAuth2(
  '48778211564-of75cphljno4hqfk96pcb41a3saoss0g.apps.googleusercontent.com',
  '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',
  'https://api.edhrrz.pro'
);

async function getToken(req, res) {
  try {
    const { code } = req.body;

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    res.status(200).json({ message: "Token obtained successfully", tokens });
  } catch (error) {
    console.error("Error getting token:", error.message);
    res.status(500).json({ error: error.message });
  }

}

// update some data in the user, we need type of data to update and the new data
async function update(req, res) {
  try {
    const { uid, type, data } = req.body;
    const userRef = ref(getDatabase(), `users/${uid}`);

    await set(userRef, {
      [type]: data
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login, logout, getUserInfo, update, getToken };