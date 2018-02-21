# ashish_byrd_task

## Table of Contents

- [About The Project](#about-the-project)
- [Setting Up The Project](#setting-up-the-project)
- [Run The Project](#run-the-project)
- [Run Test Cases](#run-test-cases)
- [Design Decisions](#design-decisons)
- [Future Improvements](#future-improvements)
- [Live Version](#live-version)

# About The Project

This project has been developed as per the requirements specified in the development task. The project provides an interface to anonymous users to create and submit tickets. Employees can login to the system to view the tickets and edit the status and urgency of the tickets as well as commenting on the tickets.

The project has been developed with Python2.7, ReactJS , PostGresql, sql-alchemy, flask modules. The initial connection between the frontend and the backend is with the help of a REST interface to enable users to submit tickets and for employees to login to the system. Once, employees are logged in a Web Socket connection is established between the frontend and backend enabling secure transfer of data. The web sockets were implemented with the help of Flask-SocketIO library in the backend.

# Setting Up The Project

There are two bashs scripts which set up the project. Please run these scripts before running any part of the the project. The scripts are location in the provision folder. Please ensure you have python 2.7, python-pip and postgresql installed.

### cd provision

Change the directory to the provision directory.

### ./system_requirements.sh

Installs all the system requirements and sets up the required databases for testing and running the application.

### ./app_requirements.sh

Sets up a python virtual environment and installs all the python dependencies and adds initial user data to the database.

# Run The Project

Please ensure you have completed all the steps mentioned in [Setting Up The Project](#setting-up-the-project) before proceeding further.

## Run the Backend

The backend runs on Python 2.7. The steps to run the backend.

### cd backend

Change the directory to the backend directory

### ./run.sh

This will run the backend server on port 7000. This uses the python virtual environment.


## Run the Frontend

Please install nodejs and npm. The tutorial for this can be found [here](https://docs.npmjs.com/getting-started/installing-node)

### cd frontend

Change the directory to frontend directory

### npm install

This installs all the dependencies required for running the frontend

### npm start

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Run Test Cases

The test cases are included in the folder backend/tests. The unittest module of python was used to write test cases. Please ensure you have completed all the steps mentioned in [Setting Up The Project](#setting-up-the-project) before proceeding further.

### ./run_tests.sh

This runs all the test cases in the python virtualenv.

# Design Decisions

The technologies used in the project included:-

### Python2.7

Python 2.7 was used since it was one of the requirements metioned in the task description.

### ReactJS

The ReactJS library provides a faster alternative to normal Javascript since it uses a Virtual DOM, only rendering the part of the DOM in which a change has been detected. You can read more about that [here](https://reactjs.org/)

### PostGreSQL And SQL Alchemy

PostgreSQL provides a fast relational database system and SQL Alchemy is the python module used to access the Postgresql database. These two are also part of the stack used at Byrd and hence, were used for this project.

### SocketIO

Web sockets provide a secure 2-way channel between the frontend and backend and hence, were used in this project for logged in users. Flask_SocketIO library was used to implement this with Python

# Future Improvements

Some future enhancements which were not implemented currently include:-

## Dockerize the system

Create Docker image of the project for easy deployment on any system.

## Add test cases

Add test cases for border conditiosn like llength of message,invalid email etc. for the backend.
Implement frontend testing.

## Add more options for the user

Allow employees to get only tickets with a certain urgency and status etc.

# Live Version
The project is currently deployed on AWS EC2 server and can be viewed [here](http://ec2-18-195-233-45.eu-central-1.compute.amazonaws.com)
