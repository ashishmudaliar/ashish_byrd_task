#!/bin/bash

BACKEND_PATH=../backend

cd $BACKEND_PATH
virtualenv -p python env
. env/bin/activate
pip install -r requirements.txt

PYTHONPATH=$BACKEND_PATH CONFIG='../config/config.py' python db_operations/reset_database.py
PYTHONPATH=$BACKEND_PATH CONFIG='../config/config.py' python db_operations/add_test_data.py
