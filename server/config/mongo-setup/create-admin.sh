#!/bin/bash
sudo service mongod stop
sudo sed -i '/.*security.*:/d' /etc/mongod.conf
sudo sed -i '/.*authorization.*/d' /etc/mongod.conf
sudo service mongod restart
sleep 3
mongo ./admin-creadentials.js ./create-admin.js
exit
echo "security: \n  authorization: \"enabled\"" | sudo tee -a /etc/mongod.conf
sudo service mongod restart