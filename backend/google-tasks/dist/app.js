"use strict";

var _require = require('googleapis'),
  google = _require.google;

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
var oauth2Client = new google.auth.OAuth2('48778211564-of75cphljno4hqfk96pcb41a3saoss0g.apps.googleusercontent.com', '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', 'https://www.edhrrz.pro');

// Access scopes for read-only Drive activity.
var scopes = ['https://www.googleapis.com/auth/tasks.readonly', 'https://www.googleapis.com/auth/tasks'];

// Generate a url that asks permissions for Tasks scope.
var authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});
console.log(authorizationUrl);