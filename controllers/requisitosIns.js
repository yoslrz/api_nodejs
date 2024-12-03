const express = require('express');
const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const router = express.Router();

router.get('/',async(req ,res) =>{
    const info =  await serviceInstance.readData();
    //console.log(info)
    const requisitos = info.requisitos_inscripcion;
    //console.log(requisitos)
    if (requisitos){
        res.json(requisitos);
    }else{
        res.status(404).json({ error: "Requisitos no encontrados" });
    }
});

router.post('/',async(req ,res) =>{
    const info = await serviceInstance.readData();
    const body = req.body;
    const nuevo = {
        id :info.requisitos_inscripcion.length +1,
        ...body,
    };
    info.requisitos_inscripcion.push(nuevo);
    await serviceInstance.writeData(info);
    res.json(nuevo)
});


router.put('/:id',async(req ,res) =>{
    const data = await serviceInstance.readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const requisitoIndex = data.requisitos_inscripcion.findIndex((requisitos_inscripcion) => requisitos_inscripcion.id === id);
    console.log(requisitoIndex)
    data.requisitos_inscripcion[requisitoIndex] = {
        ...data.requisitos_inscripcion[requisitoIndex],
        ...body,
    };
    await serviceInstance.writeData(data);
    res.json({ message: "Requisito actualizado con exito" });
});

module.exports = router;
