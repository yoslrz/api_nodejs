const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path');
const fechasController = require('./controllers/fechas.js');
const requisitosController = require('./controllers/requisitosIns.js');
const ofertaControlleller = require('./controllers/oferta.js')
const db = require('./config/base_datos.json');

// Crear el servidor express
const app = express();
const port = 3000;

app.use(bodyParser.json())
// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar el cuerpo de las peticiones
app.use(bodyParser.json());

// Rutas
app.use('/fechas', fechasController);
app.use('/requisitos_inscripcion', requisitosController);
app.use('/oferta', ofertaControlleller);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
