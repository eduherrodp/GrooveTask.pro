const { createUser } = require('../services/firebaseService');
const { createUserInDatabase } = require('../models/userModel');

async function signup(req, res) {
  const { email, password, username } = req.body;

  try {
    const user = await createUser(email, password);
    await createUserInDatabase(user.uid, email, username);

    console.log("User registered:", user);
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup };
