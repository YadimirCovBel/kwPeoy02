#!/usr/bin/bash

# Arrancar MongoDB
echo "Arrancando MongoDB..."
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod

# Arrancar Express
echo "Arrancando Express..."
cd /home/ubuntu/kwProy02/backend/server.js
node server.js &

# Arrancar servidor Angular
echo "Arrancando servidor Angular..."
cd /home/ubuntu/kwProy02/proyLavanderia02/dist/proy-lavanderia02
http-server -p 3008 &

echo "Todos los servicios han sido iniciados."