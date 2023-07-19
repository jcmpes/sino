const contenidoElement = document.getElementById('contenido');
const siButton = document.getElementById('siButton');
const noButton = document.getElementById('noButton');

function actualizarContenido() {
  // Enviar una solicitud AJAX al servidor para obtener el contenido actualizado
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Actualizar el contenido del párrafo con la respuesta del servidor
      contenidoElement.textContent = this.responseText;
    }
  };
  xhttp.open('GET', '/obtener-contenido', true);
  xhttp.send();
}

siButton.addEventListener('click', function () {
  // Enviar una solicitud AJAX al servidor para guardar el texto en el archivo
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Actualizar el contenido del párrafo después de guardar el texto
      actualizarContenido();
    }
  };
  xhttp.open('POST', '/', true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.send('texto=SI');
});

noButton.addEventListener('click', function () {
  // Enviar una solicitud AJAX al servidor para guardar el texto en el archivo
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Actualizar el contenido del párrafo después de guardar el texto
      actualizarContenido();
    }
  };
  xhttp.open('POST', '/', true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhttp.send('texto=NO');
});

// Inicialmente, obtener y mostrar el contenido actualizado
actualizarContenido();
