const pool = require('../ConexionDB/DAO.js');
//const serviceInstance = new Service();
const express = require('express');
const router = express.Router();
const { requestDocuemento } = require('../service/models.js')

const{obtenerDocumentos,
    agregarDocumentacion,
    editarDocumentacion} = require('../service/requisitos.js');


router.get('/', async(req, res) =>{
    try{
        const result = await obtenerDocumentos();
        res.json(result);
    }catch(error){
        console.error('ERROR al ejecutar la consulta: ', error);
        res.status(500).json({ error: error.message});
    }    
});



router.post('/', async (req, res) => {
  const { error, value } = requestDocuemento.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoDoc = await agregarDocumentacion(value);
    res.status(201).json(nuevoDoc);
  } catch (err) {
    console.error('Error al crear doc:', err);
    res.status(400).json({ error: err.message }); 
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestDocuemento.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaDoc = await editarDocumentacion(id, value);
    res.status(201).json(nuevaDoc);
  } catch (err) {
    console.error('Error al editar doc:', err);
    res.status(400).json({ error: err.message }); 
  }
});

module.exports = router;
