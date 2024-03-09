const express = require('express');
const { jsonMiddleware } = require('./middlewares/jsonMiddleware');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(jsonMiddleware);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
