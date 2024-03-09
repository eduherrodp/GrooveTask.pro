"use strict";

var _require = require('googleapis'),
  google = _require.google;
var oauth2Client = new google.auth.OAuth2('48778211564-of75cphljno4hqfk96pcb41a3saoss0g.apps.googleusercontent.com', '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', 'https://www.edhrrz.pro');
var code = 'code=4/0AeaYSHCmGwGZqMePbL0k5PAifDEYRd3GSMDKhWn00aPIKikTN0zwAGooXvT031hb5tJaZw'; // Código de autorización de la URL

oauth2Client.getToken(code, function (err, tokens) {
  if (err) {
    console.error('Error al obtener tokens de OAuth2:', err);
    // Manejar el error adecuadamente
  } else {
    // Configurar el cliente OAuth2 con los tokens de acceso
    oauth2Client.setCredentials(tokens);

    // Ahora puedes usar el cliente OAuth2 para realizar solicitudes a la API de Google Tasks
    // Por ejemplo, obtener las listas de tareas
    var tasks = google.tasks({
      version: 'v1',
      auth: oauth2Client
    });
    tasks.tasklists.list({}, function (err, response) {
      if (err) {
        console.error('Error al obtener las listas de tareas:', err);
        // Manejar el error adecuadamente
      } else {
        var taskLists = response.data.items;
        // Haz algo con las listas de tareas
        console.log('Listas de tareas:', taskLists);
      }
    });
  }
});