// userController.js
const { createUser } = require('../services/firebaseService');
const { createUserInDatabase } = require('../models/userModel');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, get, set } = require('firebase/database');
const jwt = require('jsonwebtoken');

const secretKey = 'ZxWXV@rcUiRG9BU#s2T323V55'; // Simplicidad
const auth = getAuth();

// generateToken function is used to generate a session token
function generateToken(user) {
  return jwt.sign({ userId: user }, secretKey, { expiresIn: '1h' }); // Expires in 1 hour
}

// Controller to register a new user
async function signup(req, res) {
  const { email, password, username } = req.body;

  try {
    const user = await createUser(email, password);
    // also we need to add that user still don't vinculate their google account for using task api
    await createUserInDatabase(user.uid, email, username, false);

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

// Function to add new register in user, as code, phone, etc
async function saveData(req, res) {
  try {
    // We receive the type of data to save, and the data
    const { type, data, uid } = req.body;

    console.log("Type:", type);
    console.log("Data:", data);
    console.log("UID:", uid);

    // get refernece to the user in the database
    const userRef = ref(getDatabase(), `users/${uid}`);

    // Get user information from the database
    const snapshot = await get(userRef);
    const userData = snapshot.val();
      
    if (userData) {
      // Save the data in the user
      userData[type] = data;

      // Update the user in the database
      await set(userRef, userData);

      res.status(200).json({ message: "Data saved successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login, logout, getUserInfo, saveData };