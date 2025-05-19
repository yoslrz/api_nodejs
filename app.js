const port = 3000;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 
// const db = require('./config/base_datos.json');
const fechasController = require('./controllers/fechas.js');
const ofertaControlleller = require('./controllers/oferta.js');
const requisitosController = require('./controllers/requisitosIns.js');

const fechasRoutes = require('./controllers/fechas.js');
const ofertaAcaRoutes = require('./controllers/oferta.js');

const app = express();

// Inicia el servidor
app.use(bodyParser.json())
// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para analizar el cuerpo de las peticiones
app.use(bodyParser.json());

// Rutas
app.use('/fechas', fechasController);
app.use('/requisitos_inscripcion', requisitosController);
app.use('/oferta', ofertaControlleller);

app.use('/api/fechasDB', fechasRoutes);
app.use('/api/ofertaAcademicaBD', ofertaAcaRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});







