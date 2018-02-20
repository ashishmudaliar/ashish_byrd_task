import logging
from flask import session, copy_current_request_context,request
from flask_socketio import SocketIO, emit

statusObject = {}
def create_sio(request_handler):
    sio = SocketIO(engineio_logger=True, logger=True)

    @sio.on('connect')
    def connect():
        logging.info('SocketIO Connect')
        statusObject[session['username']] = request.sid
        return 'username' in session

    @sio.on('disconnect')
    def disconnect():
        logging.info('SocketIO Disconnect')
        pass

    @sio.on('request')
    def call(data):
        # to be able to handle all requests asynchronously we create a separate thread
        # for each of the requests, but in order to be able to access database
        # we need to have flask app context, for that handle_async_request_wrapper
        # function is created (it makes sure that spawned thread has access to the context)
        @copy_current_request_context
        def handle_async_request_wrapper(handle_request, method, request, username):
            response = handle_request(method, request, username)
            emit("response", response)

        response = request_handler.handle_request(data, session["username"], handle_async_request_wrapper)
        if response is not None:
            emit("response", response)

    @sio.on('echo')
    def echo(data):
        logging.info('echo')
        emit("echo_response", data)

    return sio
