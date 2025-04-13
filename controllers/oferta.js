const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const pool = require('../ConexionDB/DAO.js');
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const express = require('express');
const router = express.Router();


router.get('/', async(req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM oferta_academica;')
        res.json(result.rows);
    }catch (error){
        console.error('Error al ejecutar la consulta: ' ,error);
        res.status(500).json({error: error.message});
    }
});

router.delete('/eliminar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    try{
        await pool.query('DELETE FROM oferta_academica WHERE id_ofer_academica = $1', [id_ofer_academica]);
        
    }catch(error){res.json({ mensaje: 'Registro eliminado de Oferta Academica' });
        console.error('ERROR: Al eliminar el registro de la base de datos');
        res.status(500).json({error: error.message});
    }
});

router.put('/agregar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    const {nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica } = req.body;
    try{
        const verifica = await pool.query('SELECT * FROM oferta_academica WHERE id_ofer_academica = $1', [id_ofer_academica]);
        if(verifica.rows.lenght > 0){
            await pool.query('UPDATE oferta_academica set nombre_ofer_academica = $1, tipo_ofer_academica = $2, semestres_ofer_academica = $3, plantel_ofer_academica = $4 , fecha_creacion_ofer_academica = $5, fecha_edicion_ofer_academica = $6, fecha_eliminacion_ofer_academica = $7 WHERE id_ofer_academica = $8',
                [nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica, id_ofer_academica]
            );
            res.json({mensaje: 'OFERTA ACADEMICA ACTUALIZADA'});
        }else{
            await pool.query('INSERT INTO oferta_academica (id_ofer_academica, nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [id_ofer_academica, nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica]
            );
            res.json({mensaje: 'Oferta academica agregada'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
/*

//MUESTRA LOS DATOS DE DEL JSON DE OFERTA 
router.get("/oferta", async (req, res) => {
    const data = await serviceInstance.readData();
    res.json(data.oferta);
});

//BUSCA EL PLANTEL POR ID O NOMBRE
router.get("/oferta/:id", async (req, res) =>{
    const data = await serviceInstance.readData();
    const id = parseInt(req.params.id);
    const plantel = data.oferta.find((plantel) => plantel.id === id);
    res.json(plantel);
});
router.get("/oferta/plantel/:name", async (req, res) =>{
    const data = await serviceInstance.readData();
    const nombre = req.params.name;
    const plantel = data.oferta.find((plantel) => plantel.name === nombre);
    res.json(plantel);
});

//COINCIDENCIA DE CARRERAS QUE SE IMPARTEN EN UNO O VARIOS PLANTELES
router.get("/oferta/platel/:carrera", async (req, res) => {
    const data = await serviceInstance.readData();
    const carreraBuscado = req.params.carrera;
    const resultados = data.oferta.filter(item => item.Carrera.includes(carreraBuscado));
    res.json({resultados});
    console.log('hola esto es una prueba')
});

*/



