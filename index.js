//require("express") //importacion de librerias 
import express from 'express'; //se debe agregar type:module al packjson debajo de main
import fs from 'fs'; //permite tranajar con archivos
import bodyParser from 'body-parser'; // midelwart para interprestar datos

const app = express();
app.use(bodyParser.json())

const readData = () =>{ // Funcion para leer archivos
    try{
        const data = fs.readFileSync("./base_datos.json");
        return JSON.parse(data)
    }catch(error){
        console.log(error)
    }
};

const writeData = (data) =>{ // Funcion para leer archivos
    try{
        fs.writeFileSync("./base_datos.json",JSON.stringify(data));
    }catch(error){
        console.log(error)
    }
};



app.listen(3000,()=>{ // se dice en que puerto esta escuhcando 
    console.log("servidor ecuchando")
});

app.get('/',(req ,res)=>{ //res = respuesta y req = request
    res.send("hola") // envio
});

app.get('/fechas/:modulo',(req ,res) =>{
    const info =  readData();
    const modulo = req.params.modulo;
    const fechas_modulo = info.fechas.find((fechas_modulo)=>fechas_modulo.modulo === modulo);
    console.log(fechas_modulo)
    if (fechas_modulo){
        res.json(fechas_modulo);
    }else{
        res.status(404).json({ error: "Módulo inválido" });
    }
});

app.post('/fechas',(req ,res) =>{
    const info = readData();
    const body = req.body;
    const nuevo = {
        id :info.fechas.length +1,//cuenta las fechas y le suma uno para posteriormente agregarlo al body
        ...body,//agrega el id al body
    };
    info.fechas.push(nuevo);
    writeData(info);
    res.json(nuevo)
});


app.put('/fechas/:id',(req ,res) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const fechaIndex = data.fechas.findIndex((fechas) => fechas.id === id); //busca la fecha por el id
    data.fechas[fechaIndex] = {
        ...data.fechas[fechaIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Fecha actualizada con exito" });
});

/** Rutas de Requistos de inscripcion .........**/
app.get('/requisitos_inscripcion',(req ,res) =>{
    const info =  readData();
    console.log(info)
    const requisitos = info.requisitos_inscripcion;
    console.log(requisitos)
    if (requisitos){
        res.json(requisitos);
    }else{
        res.status(404).json({ error: "Requisitos no encontrados" });
    }
});

app.post('/requisitos_inscripcion',(req ,res) =>{
    const info = readData();
    const body = req.body;
    const nuevo = {
        id :info.requisitos_inscripcion.length +1,
        ...body,
    };
    info.requisitos_inscripcion.push(nuevo);
    writeData(info);
    res.json(nuevo)
});


app.put('/requisitos_inscripcion/:id',(req ,res) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const requisitoIndex = data.requisitos_inscripcion.findIndex((requisitos_inscripcion) => requisitos_inscripcion.id === id);
    console.log(requisitoIndex)
    data.requisitos_inscripcion[requisitoIndex] = {
        ...data.requisitos_inscripcion[requisitoIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Requisito actualizado con exito" });
});

/** Rutas de  .........**/

//MUESTRA LOS DATOS DE DEL JSON DE OFERTA 
app.get("/oferta", (req, res) => {
    const data = readData();
    res.json(data.oferta);
});

//BUSCA EL PLANTEL POR ID O NOMBRE
app.get("/oferta/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const plantel = data.oferta.find((plantel) => plantel.id === id);
    res.json(plantel);
});
app.get("/oferta/plantel/:name", (req, res) =>{
    const data = readData();
    const nombre = req.params.name;
    const plantel = data.oferta.find((plantel) => plantel.name === nombre);
    res.json(plantel);
});

//COINCIDENCIA DE CARRERAS QUE SE IMPARTEN EN UNO O VARIOS PLANTELES
app.get("/oferta/platel/:carrera", (req, res) => {
    const data = readData();
    const carreraBuscado = req.params.carrera;
    const resultados = data.oferta.filter(item => item.Carrera.includes(carreraBuscado));
    res.json({resultados});
});

//COINCIDECIA DE SERVICIOS EN LOS DISTINTOS PLANTELES 
app.get("/servicios/general/:servicio", (req, res) => {
    const data = readData();
    const serviceBuscado = req.params.servicio;
    const resultados = data.servicios.filter(item => item.servicio.includes(serviceBuscado));
    res.json({resultados});
});

//BUSCA LOS SERVICIOS POR PLANTEL MEDIANTE EL ID
app.get("/servicios/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const plantel = data.servicios.find((plantel) => plantel.id === id);
    res.json(plantel);
});

//BUSCA LOS SERVICIOS POR PLANTEL MEDIANTE DEL NOMBRE DEL PLANTEL
app.get("/servicios/plantel/:name", (req, res) => {
    const data = readData();
    const nombre = req.params.name;
    const plantel = data.servicios.find((plantel) => plantel.name === nombre);
    res.json(plantel);
});

app.get("/servicios/planteles/:servicio", (req, res) => {
    const data = readData();
    const service = req.params.servicio;
    const plantel = data.servicios.find((plantel) => plantel.servicio === service);
    res.json(plantel);
});

//Metodo GET
app.get("/proceso_reinscripcion",(req,res) => {
    const info = readData();
    //console.log(info);
    const instrucciones = info.proceso_reinscripcion;
    //console.log(instrucciones);
    if (instrucciones){
        res.json(instrucciones);
    }else{
        res.status(404).json({ error: "Instrucciones NO encontradas" });
    }
});

//Metodo POST
app.post("/oferta_academica",(req,res) => {
    const info = readData();
    const body = req.body;
    const nuevo = {
        id: info.oferta_academica.length + 1,
        ...body,
    };
    info.oferta_academica.push(nuevo);
    writeData(info);
    res.json("Carrera agregada a la oferta académica");
});

//Metodo PUT
app.put("/oferta_academica/:id", (req,res) => {
    const info = readData();
    const body = req.body; 
    const id = parseInt(req.params.id);
    const carreraIndex = info.oferta_academica.findIndex((carrera) => carrera.id === id);
    info.oferta_academica[carreraIndex] = {
        ...info.oferta_academica[carreraIndex],
        ...body,
    };
    writeData(info);
    res.json({message: "Oferta Academica actualizada con exito"});
});