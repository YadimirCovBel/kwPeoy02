#!/usr/bin/bash

echo "Leyendo directorio..."
ls > procesos.txt
echo "Archivo generado satisfactoriamente"

echo "Leyendo información de red..."
ip addr > redes.txt
echo "Archivo de redes creado satisfactoriamente"

export SYSTEMD_DIRECTORY=/home/ubuntu/kwProy02/pre-config
export SYSTEMD_START=/bin/bash /home/ubuntu/kwProy02/pre-config/02bash.sh

# Arrancar MongoDB
echo "Arrancando MongoDB..."
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod

# Arrancar Express
echo "Arrancando Express..."
cd /ruta/al/directorio/de/express
node server.js &

# Arrancar servidor Angular
echo "Arrancando servidor Angular..."
cd /home/yadimir/Desktop/kwProy02/proyLavanderia02/dist/proy-lavanderia02
http-server -p 3008 &

echo "Todos los servicios han sido iniciados."