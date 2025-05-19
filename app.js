const port = 3000;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 


const fechasRoutes = require('./controllers/fechas.js');
const ofertaAcaRoutes = require('./controllers/oferta.js');
const documentacionRouter = require('./controllers/requisitosIns.js');
const serviciosRouter = require('./controllers/servicios.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.use('/api/fechasDB', fechasRoutes);
app.use('/api/ofertaAcademicaBD', ofertaAcaRoutes);
app.use('/api/documentosDB', documentacionRouter);
app.use('/api/serviciosDB', serviciosRouter);

console.log("🚀 Arrancando servidor y cargando rutas...");

// Escuchar errores no manejados para debug
process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no atrapada:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
});

// Verificar que las rutas se han cargado
console.log('Rutas registradas:');
console.log(app._router.stack
  .filter(r => r.route)
  .map(r => r.route.path));

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
