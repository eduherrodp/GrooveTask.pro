// Controlador (controller.js)
const model = require('./model');

function getAuthorizationLink(req, res) {
  const authorizationUrl = model.generateAuthorizationUrl();
  console.log('Authorize this app by visiting this url:', authorizationUrl);
  res.status(200).json({ link: authorizationUrl });
}

module.exports = {
  getAuthorizationLink
};
