#!/usr/bin/bash

# Definición de variables para rutas
BACKEND_DIR="/home/ubuntu/kwProy02/backend"
ANGULAR_DIR="/home/ubuntu/kwProy02/proyLavanderia02/dist/proy-lavanderia02"
PRE_CONFIG_DIR="/home/ubuntu/kwProy02/pre-config"

echo "Leyendo directorio..."
ls > "$PRE_CONFIG_DIR/procesos.txt"
echo "Archivo generado satisfactoriamente"

echo "Leyendo información de red..."
ip addr > "$PRE_CONFIG_DIR/redes.txt"
echo "Archivo de redes creado satisfactoriamente"



# Instalación de paquetes básicos en Raspberry Pi
echo "Actualizando..."
sudo apt update && echo "Update satisfactoriamente..."

# Función para verificar si un paquete está instalado
is_installed() {
    dpkg -l "$1" &> /dev/null
}

# Instalar un paquete si no está instalado
install_package() {
    if ! is_installed "$1"; then
        echo "Instalando $1..."
        sudo apt install -y "$1" && echo "$1 instalado satisfactoriamente..."
    else
        echo "$1 ya está instalado."
    fi
}

# Instalar paquetes
install_package "build-essential"
install_package "wiringpi"
install_package "nodejs"
install_package "git"
install_package "python3"
install_package "npm"
install_package "ng-common"

# Instalar http-server si no está disponible
if ! command -v http-server &> /dev/null; then
    echo "Instalando http-server..."
    npm install -g http-server && echo "http-server instalado satisfactoriamente..."
fi

# Instalar Angular CLI si no está disponible
if ! command -v ng &> /dev/null; then
    echo "Instalando Angular CLI..."
    sudo npm install -g @angular/cli && echo "Angular CLI instalado satisfactoriamente..."
fi


# extracting ssh key
if [ ! -f "$HOME/.ssh/id_rsa" ]; then
    echo "Extrayendo clave..."
    ssh-keygen -t rsa -q -f "$HOME/.ssh/id_rsa" -N "" && cat "$HOME/.ssh/id_rsa.pub" && echo "La clave ha sido extraída satisfactoriamente..."
fi

# cloning git
echo "cloning repo..."
git clone https://github.com/YadimirCovBel/kwPeoy02.git
cd kwPeoy02
git pull origin main
echo "the repo has been cloned satisfactorily ..."
