const port = 3000;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const fechasRoutes = require('./controllers/fechas.js');
const ofertaAcaRoutes = require('./controllers/oferta.js');
const documentacionRouter = require('./controllers/requisitosIns.js');
const serviciosRouter = require('./controllers/servicios.js');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// -------------------- Middlewares --------------------
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// -------------------- Swagger config --------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Académica',
      version: '1.0.0',
      description: 'Documentación automática de la API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './controllers/*.js',
    './docs/*.js'
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ------------------------------------------------------

// -------------------- Rutas --------------------
app.use('/api/fechasDB', fechasRoutes);
app.use('/api/ofertaAcademicaBD', ofertaAcaRoutes);
app.use('/api/documentosDB', documentacionRouter);
app.use('/api/serviciosDB', serviciosRouter);

// -------------------- Logs --------------------
console.log('🚀 Arrancando servidor y cargando rutas...');

// Escuchar errores no manejados para debug
process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no atrapada:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason, 'en', promise);
});

// Verificar rutas cargadas
console.log('Rutas registradas:');
console.log(
  app._router.stack
    .filter((r) => r.route)
    .map((r) => r.route.path)
);

// -------------------- Server --------------------
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
  console.log(`Swagger disponible en http://localhost:${port}/docs`);
});
