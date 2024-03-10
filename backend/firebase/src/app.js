// app.js
const express = require('express');
const { jsonMiddleware } = require('./middlewares/jsonMiddleware');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration for CORS
const corsOptions = {
  origin: 'https://www.edhrrz.pro',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(jsonMiddleware);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});