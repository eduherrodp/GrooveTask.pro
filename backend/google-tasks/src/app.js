const { google } = require('googleapis');

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const oauth2Client = new google.auth.OAuth2(
  '48778211564-of75cphljno4hqfk96pcb41a3saoss0g.apps.googleusercontent.com',
  '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',
  "https://www.edhrrz.pro/pages/dashboard.html"
);

// Access scopes for read and write tasks
const scopes = [
  'https://www.googleapis.com/auth/tasks.readonly',
  'https://www.googleapis.com/auth/tasks'
];

// Habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Route to get the authorization URL
app.get('/getLink', (req, res) => {
  // Generate a url that asks permissions for Tasks scope.
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'online',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
  });
  console.log(authorizationUrl);

  res.status(200).json({ link: authorizationUrl });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
