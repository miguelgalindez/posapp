#!/bin/bash
sudo service mongod restart
sleep 3
mongo ./admin-creadentials.js ./app-user-credentials.js ./create-app-user.js
exit