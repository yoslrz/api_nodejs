#!/bin/sh

echo "Ejecutando init.js..."
node init.js
if [ $? -ne 0 ]; then
  echo "❌ Falló la inicialización, abortando."
  exit 1
fi

echo "Init.js completado exitosamente."
echo "Ejecutando app.js..."

node app.js

echo "app.js terminó inesperadamente." # Esto no debería imprimirse si el servidor queda corriendo.
