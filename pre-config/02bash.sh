#!/usr/bin/bash

# Definición de variables para rutas
BACKEND_DIR="/home/ubuntu/kwProy02/backend"
ANGULAR_DIR="/home/ubuntu/kwProy02/proyLavanderia02/dist/proy-lavanderia02"


# Arrancar MongoDB
echo "Arrancando MongoDB..."
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod
echo "MongoDB Arrancado satisfactoriamente..."

# Arrancar Express
echo "Arrancando Express..."
cd /home/ubuntu/kwProy02/backend/server.js
node server.js &
echo "Express Arrancado satisfactoriamente  ..."

# Arrancar servidor Angular
echo "Arrancando servidor Angular..."
cd /home/ubuntu/kwProy02/proyLavanderia02/dist/proy-lavanderia02
http-server -p 3008 &
echo "Angular Arrancado satisfactoriamente  ..."

echo "Todos los servicios han sido iniciados."