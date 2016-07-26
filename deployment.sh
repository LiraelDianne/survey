#!/bin/bash
cd /etc/nginx/sites-available
mv project $1
sudo ln -s /etc/nginx/sites-available/$1 /etc/nginx/sites-enabled/$1

cd /var/www
sudo git clone https://github.com/LiraelDianne/$1.git
cd $1
npm install
sudo bower install –allow-root

sudo service mongod start
pm2 start server.js
sudo service nginx reload && sudo service nginx restart
