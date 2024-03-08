const {google} = require('googleapis');

// Configure variables
const YOUR_CLIENT_ID = "48778211564-07ut102cl4e9kpfgfh2c7v03qnba376v.apps.googleusercontent.com";
const YOUR_CLIENT_SECRET = "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";
const YOUR_REDIRECT_URL = "http://localhost:3000/tasks";

// Create an oAuth2 client to authorize the API call
const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});