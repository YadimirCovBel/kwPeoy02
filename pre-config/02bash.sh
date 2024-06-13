#!/usr/bin/bash

echo "Leyendo directorio..."
ls > procesos.txt
echo "Archivo generado satisfactoriamente"

echo "Leyendo información de red..."
ip addr > redes.txt
echo "Archivo de redes creado satisfactoriamente"

export SYSTEMD_DIRECTORY=/home/ubuntu/kwProy02/pre-config
export SYSTEMD_START=/bin/bash /home/ubuntu/kwProy02/pre-config/02bash.sh
export BACKEND_DIR="/home/ubuntu/kwProy02/backend"
export ANGULAR_DIR="/home/ubuntu/kwProy02/proyLavanderia02/dist/proy-lavanderia02"


# instalar basicos en Rasberry pi
echo "actualizando..."
sudo apt update
echo "Update satisfactoriamente..."

echo "instalando build esential ..."
sudo apt install -y build-essential
build-essential -v
echo "buid-esential instalando satisfactoriamente..."

echo "instalando WiringPi..."
sudo apt -y install wiringpi
gpio -v
echo "WiringPi instalando satisfactoriamente..."

echo "instalando node.js..."
sudo apt install -y nodejs
node -v
echo "nodejs instalando satisfactoriamente..."

echo "instalando http-server..."
npm install -g http-server
echo "http-server instalando satisfactoriamente..."


echo "instalando git..."
sudo apt install -y git
git --version
echo "git instalando satisfactoriamente..."

echo "instalando python..."
sudo apt install -y python3
python3 --version
echo "python3 instalando satisfactoriamente..."

echo "instalando npm..."
sudo apt install -y npm
npm -v
echo "npm instalando satisfactoriamente..."

echo "Instalando Angular CLI..."
sudo npm install -g @angular/cli
ng version
echo "Angular instalando satisfactoriamente..."

echo "instalando ng..."
sudo apt install ng-common
ng-common -v
echo "ng-common instalando satisfactoriamente..."

echo "todos los basicos han sido instalandos satisfactoriamente..."


# extracting ssh key
echo "extracting key..."
ssh-keygen -t rsa -q -f "$HOME/.ssh/id_rsa" -N ""
cat "$HOME/.ssh/id_rsa.pub"
echo "the key has been extracted satisfactorily ..."

# cloning git
echo "cloning repo..."
git clone https://github.com/YadimirCovBel/kwPeoy02.git
cd kwPeoy02
git pull origin main
echo "the repo has been cloned satisfactorily ..."

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