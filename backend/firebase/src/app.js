const express = require('express');
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, set } = require('firebase/database');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCh3HAFSgVtgxro8HySEfHcR1D3cjeUOJ4",
  authDomain: "groove-416603.firebaseapp.com",
  databaseURL: "https://groove-416603-default-rtdb.firebaseio.com/",
  projectId: "groove-416603",
  storageBucket: "groove-416603.appspot.com",
  messagingSenderId: "48778211564",
  appId: "1:48778211564:web:a2440c37249bdf312135c9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// Configuración de Express
const appExpress = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las solicitudes
appExpress.use(express.json());

// Ruta para crear un nuevo usuario
appExpress.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Crea un nuevo usuario con el correo electrónico y la contraseña proporcionados
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda los datos adicionales del usuario en la base de datos
    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      username: username
    });

    console.log("Usuario registrado:", user);
    res.status(200).json({ message: "Usuario registrado correctamente", user });
  } catch (error) {
    // Se produjo un error durante el registro
    const errorMessage = error.message;
    console.error("Error al registrar usuario:", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
});

// Inicia el servidor
appExpress.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
