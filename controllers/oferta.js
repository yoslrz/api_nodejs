const express = require('express');
const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const router = express.Router();
const { requestOferta } = require('../service/models.js');

//Faltan metodos post y put

//MUESTRA LOS DATOS DE DEL JSON DE OFERTA 
router.get("/oferta", (req, res) => {
    const data = readData();
    res.json(data.oferta);
});

//BUSCA EL PLANTEL POR ID O NOMBRE
router.get("/oferta/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const plantel = data.oferta.find((plantel) => plantel.id === id);
    res.json(plantel);
});

router.get("/oferta/plantel/:name", (req, res) =>{
    const data = readData();
    const nombre = req.params.name;
    const plantel = data.oferta.find((plantel) => plantel.name === nombre);
    res.json(plantel);
});

//COINCIDENCIA DE CARRERAS QUE SE IMPARTEN EN UNO O VARIOS PLANTELES
router.get("/oferta/platel/:carrera", (req, res) => {
    const data = readData();
    const carreraBuscado = req.params.carrera;
    const resultados = data.oferta.filter(item => item.Carrera.includes(carreraBuscado));
    res.json({resultados});
});

module.exports = router;