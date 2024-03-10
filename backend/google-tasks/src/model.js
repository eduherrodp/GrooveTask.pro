// Modelo (model.js)
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '48778211564-of75cphljno4hqfk96pcb41a3saoss0g.apps.googleusercontent.com',
  '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',
  "https://www.edhrrz.pro/pages/dashboard.html"
);

const scopes = [
  'https://www.googleapis.com/auth/tasks.readonly',
  'https://www.googleapis.com/auth/tasks'
];

function generateAuthorizationUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
  });
}

module.exports = {
  generateAuthorizationUrl
};
