#!/usr/bin/bash

echo "Leyendo directorio..."
ls > procesos.txt
echo "Archivo generado satisfactoriamente"

echo "Leyendo información de red..."
ip addr > redes.txt
echo "Archivo de redes creado satisfactoriamente"

export SYSTEMD_DIRECTORY=/home/ubuntu/kwProy02/pre-config
export SYSTEMD_START=/bin/bash /home/ubuntu/kwProy02/pre-config/02bash.sh

# instalar basicos en Rasberry pi
echo "actualizando..."
sudo apt update
echo "instalando build esential..."
sudo apt install buid-esential
buid-esential -v
echo "instalando wiring pi..."
sudo apt -y install wiringpi
wiringpi -v
echo "instalando node.js..."
sudo apt install node.js
node -v
echo "instalando git..."
sudo apt install git
git -v
echo "instalando python..."
sudo apt install python3
python3 -v
echo "instalando npm..."
sudo apt install npm
npm -v
echo "instalando ng..."
sudo apt install ng-common
ng-common -v


# extracting key
echo "extracting key..."
ssh -keygen -t rsa
cat id_rsa.pub

# cloning git
git clone https://github.com/YadimirCovBel/kwPeoy02.git
git pull origin main pull

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