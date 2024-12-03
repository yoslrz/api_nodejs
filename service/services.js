const fs = require('fs');
const path = require('path');  // Usamos 'path' para obtener la ruta correcta
const base_datos_path = path.join(__dirname, '..', 'config', 'base_datos.json');  // Construye la ruta completa

class Service {
    // Función asíncrona para leer datos desde un archivo
    async readData() {
        try {
            const data = fs.readFileSync(base_datos_path, 'utf8');  // Lee el archivo como una cadena de texto
            return JSON.parse(data);  // Convierte los datos leídos en un objeto JSON
        } catch (error) {
            console.log(error);  // Si ocurre un error, lo muestra
            throw new Error('Error al leer el archivo de datos');
        }
    }

    // Función asíncrona para escribir datos en un archivo
    async writeData(data) {
        try {
            fs.writeFileSync(base_datos_path, JSON.stringify(data, null, 2), 'utf8');  // Escribe los datos en el archivo JSON
        } catch (error) {
            console.log(error);  // Si ocurre un error, lo muestra
            throw new Error('Error al escribir el archivo de datos');
        }
    }
}

module.exports = Service;  // Exporta la clase para que pueda ser importada
