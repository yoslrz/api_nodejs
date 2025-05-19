# Usar una imagen oficial de Node.js como base
FROM node:20-alpine
# La imagen base es una versión ligera de Node.js, ideal para entornos de producción.

# Crear el directorio de la aplicación
WORKDIR /usr/src/app
# Define el directorio de trabajo dentro del contenedor donde se ejecutará la aplicación.

# Copiar los archivos de configuración necesarios para instalar las dependencias
COPY package*.json ./
# Copia `package.json` y `package-lock.json` al directorio de trabajo del contenedor.

# Instalar las dependencias
RUN npm install
# Instala las dependencias listadas en `package.json`.

# Copiar el resto del código de la aplicación
COPY . .
# Copia todo el contenido del directorio actual al directorio de trabajo del contenedor.

# Exponer el puerto en el que la aplicación estará disponible
EXPOSE 3000
# Declara el puerto 3000, donde la aplicación escuchará las solicitudes.

# Copia también el .env al contenedor
COPY .env . 

# Usa un script de arranque para mayor claridad y flexibilidad
RUN chmod +x ./start.sh

CMD ["./start.sh"]

