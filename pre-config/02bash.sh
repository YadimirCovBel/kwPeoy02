#!/usr/bin/bash

echo leyendo directorio...
ls > procesos.txt
echo archivo generado satisfactoriamente

echo leyendo informacion de red...
ip addr > redes.txt
echo archivo de redes creado satisfactoriamente


# Arrancar MongoDB en una nueva terminal
echo "Arrancando MongoDB..."
gnome-terminal -- bash -c "cd '/home/yadimir/Desktop/kwProy02/backend'; sudo systemctl start mongod; sudo systemctl daemon-reload; sudo systemctl status mongod; exec bash"

# Arrancar Express en una nueva terminal
echo "Arrancando Express..."
gnome-terminal -- bash -c "cd '/ruta/al/directorio/de/express'; node server.js; exec bash"

# Arrancar servidor Angular en una nueva terminal
echo "Arrancando servidor Angular..."
gnome-terminal -- bash -c "cd '/home/yadimir/Desktop/kwProy02/proyLavanderia02'; sudo serve -l 3008 -s /dist/proy-lavanderia02/; exec bash"

echo "Todos los servicios han sido iniciados en terminales separadas."