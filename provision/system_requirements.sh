#!/bin/bash

sudo apt-get update
sudo apt-get install -qy postgresql postgresql-contrib python virtualenv
sudo -u postgres createuser ashish_byrd
sudo -u postgres createdb -O ashish_byrd ashish_byrd_project
sudo -u postgres psql -c "ALTER USER ashish_byrd WITH PASSWORD 'byrdproject';"

sudo -u postgres createuser ashish_byrd_testing
sudo -u postgres createdb -O ashish_byrd_testing ashish_byrd_testing
sudo -u postgres psql -c "ALTER USER ashish_byrd_testing WITH PASSWORD 'testing';"
