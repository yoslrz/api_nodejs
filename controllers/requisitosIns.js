const express = require('express');
const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const router = express.Router();
const { requestInscripcion } = require('../service/models.js');

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
    try{
        const { error, value } = requestInscripcion.validate(req.body, { abortEarly: false });
        if (error){
            return res.status(400).json({
                error: "Datos inválidos",
                detalles: error.details.map(det => ({
                    campo: det.path.join('.'), // Nombre del campo con error
                    mensaje: det.message       // Mensaje de error de Joi
                }))
            });
        }
        const info = await serviceInstance.readData();
        const body = req.body;
        const nuevo = {
            id :info.requisitos_inscripcion.length +1,
            ...body,
        };
        info.requisitos_inscripcion.push(nuevo);
        await serviceInstance.writeData(info);
        res.json(nuevo)
    }catch (error) {
        if (error.name === "ReferenceError"){
            return res.status(400).json({ error: "Datos inválidos", detalles: error.errors });
        }
        console.log(error.name)
        console.error(error);  // Si ocurre un error en la escritura, muestra el error
        res.status(500).json({ error: "Error al agregar la fecha" });  // Responde con error 500
        }
});


router.put('/:id',async(req ,res) =>{
    try{
        const { error, value } = requestInscripcion.validate(req.body, { abortEarly: false });
        if (error){
            return res.status(400).json({
                error: "Datos inválidos",
                detalles: error.details.map(det => ({
                    campo: det.path.join('.'), // Nombre del campo con error
                    mensaje: det.message       // Mensaje de error de Joi
                }))
            });
        }
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
    }catch (error) {
        if (error.name === "ReferenceError"){
            return res.status(400).json({ error: "Datos inválidos", detalles: error.errors });
        }
        console.log(error.name)
        console.error(error);  // Si ocurre un error en la escritura, muestra el error
        res.status(500).json({ error: "Error al agregar la fecha" });  // Responde con error 500
    }
});

module.exports = router;

const speakOutput = '<speak>Para formar parte de nuestra comunidad deberás atender los siguientes requisitos para la inscripción<break time="0.1s"/>'
+'1<break time="0.1s"/>Cédula de registro como aspirante de la convocatoria a sorteo del año correspondiente<break time="0.1s"/>'
+'2<break time="0.1s"/>Acta de nacimiento en buen estado, legible, sin tachaduras o enmendaduras<break time="0.1s"/>'
+'3<break time="0.1s"/>Identificación oficial vigente <break time="0.1s"/> como Credencial para votar, Pasaporte vigente, cedula profesional con '
+'fotografia<break time="0.1s"/>¡si eres menor de edad!, presenta tu pasaporte o tu credencial del bachillerato confirmas y sellos<break time="0.1s"/>'
+'4<break time="0.1s"/>Comprobante de domicilio del año en curso con fecha de emisión no mayor a 3 meses respecto de la fecha de inscripción, puedes presentar un recibo de telefono'
+'fijo, recibo de agua, gas natural, luz, boleta predial o constancia de recidencia emitida por la alcaldia o municipio correspondiente<break time="0.1s"/>'
+'Por ultimo<break time="0.1s"/> es importante que tomes en cuenta que el nombre completo de la persona titular de los documentos oficiales entregados debe coincidir con el nombre completo'
        +'de la persona aspirante registrada, de lo contrario, no procedera su inscripción a la U A C M<break time="0.1s"/>'
        +'Para más información consulte la siguiente liga https://www.u a c m.edu.mx/Aspirantes</speak>'