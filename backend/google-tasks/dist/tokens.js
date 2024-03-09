"use strict";

var code = '4/0AeaYSHA5hfCIit9epmsHheNflP0s39dyre1CfHET3pSKrx06YacsIPKQnPsyP3XFWxNIlQ'; // Código de autorización de la URL

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
      }
    });
  }
});