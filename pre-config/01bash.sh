#!/usr/bin/bash

# Definición de variables para rutas
BACKEND_DIR="/home/ubuntu/kwProy02/backend"
ANGULAR_DIR="/home/ubuntu/kwProy02/proyLavanderia02/dist/proy-lavanderia02"
PRE_CONFIG_DIR="/home/ubuntu/kwProy02/pre-config"

echo "Leyendo directorio..."
ls > procesos.txt
echo "Archivo generado satisfactoriamente"

echo "Leyendo información de red..."
ip addr > redes.txt
echo "Archivo de redes creado satisfactoriamente"



# instalacion de paquetes basicos en Rasberry pi
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
