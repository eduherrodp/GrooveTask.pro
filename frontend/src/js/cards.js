function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debería mostrar '12' en lugar de '0'

    hours = padZero(hours);
    minutes = padZero(minutes);
    seconds = padZero(seconds);

    // Construir la cadena de tiempo
    var timeString = hours + ":" + minutes + " " + ampm;

    // Actualizar el contenido del elemento con id "clock"
    document.getElementById('clock').textContent = timeString;


    // Also we nee a date en formato completo: ej: 12 de enero de 2021
    var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    var day = days[now.getDay()];
    var month = months[now.getMonth()];
    var date = now.getDate();
    var year = now.getFullYear();

    var dateString = day + ', ' + date + ' de ' + month + ' de ' + year;

    document.getElementById('date').textContent = dateString;
  }

  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  // Actualizar el reloj cada segundo
  setInterval(updateClock, 1000);

  // Llamar a updateClock() al cargar la página para mostrar la hora actual
  updateClock();