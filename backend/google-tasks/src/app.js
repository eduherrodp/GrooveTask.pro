// Servidor (server.js)
const express = require('express');
const cors = require('cors');
const { getAuthorizationLink } = require('./controller');

const app = express();
const port = 3000;

app.use(cors());

app.get('/getLink', getAuthorizationLink);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
