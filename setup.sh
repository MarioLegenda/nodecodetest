#!/bin/bash

Color_Off='\033[0m'       # Text Reset

# Regular Colors
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan

node=/usr/bin/node

echo -e "$Cyan \n Updating System.. $Color_Off"
sudo apt-get update

if [[ ! -e $node ]]; then
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install nodejs -y
fi


echo -e "$Cyan \n Installing Yarn $Color_Off"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn -y

cd /var/www/web
yarn install
yarn clean
cd /var/www

/usr/bin/node server.js


