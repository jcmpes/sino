const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' || req.method === 'POST') {
    if (req.url === '/') {
      if (req.method === 'GET') {
        fs.readFile('./sino.txt', 'utf8', (error, contenido) => {
          if (error) {
            console.error('Ha ocurrido un error al leer el archivo:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al leer el archivo.');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`
              <html>
              <head>
                <title>Actualizar contenido sin recargar la página</title>
              </head>
              <body>
                <p id="contenido">${contenido}</p>
                <button id="siButton" type="button" value="SI">SI</button>
                <button id="noButton" type="button" value="NO">NO</button>
                <script>
                  document.addEventListener('DOMContentLoaded', function() {
                    const contenidoElement = document.getElementById('contenido');
                    const siButton = document.getElementById('siButton');
                    const noButton = document.getElementById('noButton');

                    function actualizarContenido() {
                      const xhr = new XMLHttpRequest();
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                          contenidoElement.textContent = xhr.responseText;
                        }
                      };
                      xhr.open('GET', '/obtener-contenido', true);
                      xhr.send();
                    }

                    function enviarTexto(texto) {
                      const xhr = new XMLHttpRequest();
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                          actualizarContenido();
                        }
                      };
                      xhr.open('POST', '/', true);
                      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                      xhr.send('texto=' + encodeURIComponent(texto));
                    }

                    siButton.addEventListener('click', function() {
                      enviarTexto('SI');
                    });

                    noButton.addEventListener('click', function() {
                      enviarTexto('NO');
                    });

                    // Inicialmente, obtener y mostrar el contenido actualizado
                    actualizarContenido();
                  });
                </script>
              </body>
              </html>
            `);
            res.end();
          }
        });
      } else if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          const texto = decodeURIComponent(body.split('=')[1]);
          const contenido = `Esta Super Sara abierto?: ${texto}`;
          fs.writeFile('./sino.txt', contenido, (error) => {
            if (error) {
              console.error('Ha ocurrido un error al escribir en el archivo:', error);
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Error al escribir en el archivo.');
            } else {
              console.log('El archivo se ha escrito correctamente.');
              res.writeHead(302, { 'Location': '/' }); // Redireccionar a la ruta principal
              res.end();
            }
          });
        });
      }
    } else if (req.url === '/obtener-contenido') {
      fs.readFile('./sino.txt', 'utf8', (error, contenido) => {
        if (error) {
          console.error('Ha ocurrido un error al leer el archivo:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error al leer el archivo.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(contenido);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Página no encontrada');
    }
  }
});

server.listen(port, () => {
  console.log(`Servidor web escuchando en http://localhost:${port}`);
});
