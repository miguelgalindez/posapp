#!/bin/bash
sudo service mongod stop
sudo sed '/.*security.*:/d' /etc/mongod.conf
sudo sed '/.*authorization.*/d' /etc/mongod.conf
sudo service mongod start
mongo ./admin-creadentials.js ./create-admin.js
echo "security: authorization: \"enabled\"" | sudo tee -a mongod.conf
sudo service mongod restart