import unittest
import sys
import os
import subprocess

from socketIO_client import SocketIO
from socketIO_client.exceptions import ConnectionError
import requests

# from tests.utils import ServerProcess, StopWaitingException, TEST_PORT
from ticket_manager import models
from ticket_manager.database import db
from ticket_manager.app import create_app

from time import sleep

TEST_PORT = 9000
receive_data = None

class ServerProcess:
    def __init__(self):
        # adjust the path depending on whether the tests are started via test discovery (working directory tests) or
        # or via the run_tests.py script
        if os.path.basename(os.getcwd()) == "tests":
            run_server_script = "run_test_server.py"
        else:
            run_server_script = "tests/run_test_server.py"
        self.p = subprocess.Popen(["env/bin/python", run_server_script])

    def terminate(self):
        self.p.terminate()

class StopWaitingException(Exception):
    """This Exception is used to break out of the SocketIO client wait loop"""
    pass


class TestSocketIOConnection(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.test_user = {'username': 'upload',
                         'password': 'test'}
        cls.app = create_app()[1]
        cls.server_process = ServerProcess()
        # wait a little bit for the server to wake up
        sleep(4)

    @classmethod
    def tearDownClass(cls):
        cls.server_process.terminate()

    def setUp(self):

        if not self.app.config["TESTING"]:
            sys.exit("Testing mode is not enabled. Ensure that the testing configuration is used")

        with self.app.app_context():
            db.session.close()
            db.drop_all()
            db.create_all()

            user = models.UserData('upload','test','abc@xyz.de')
            db.session.add(user)
            db.session.commit()

    def send_message(self, outgoing_event, incoming_event, data):
        global receive_data

        def on_response(*args):
            global receive_data
            receive_data, = args
            # raising this exception will break out of the wait loop
            raise StopWaitingException

        r = requests.post("http://127.0.0.1:{}/auth/login".format(TEST_PORT), data=self.test_user)
        print(r)
        self.assertEqual(r.status_code, 200)

        with SocketIO('localhost', TEST_PORT, cookies={'session': r.cookies['session']},
                      wait_for_connection=True) as socketIO:
            socketIO.emit(outgoing_event, data)
            socketIO.on(incoming_event, on_response)
            try:
                # wait until on_response callback is called or we run into 10 sec timeout
                socketIO.wait(10)
            except StopWaitingException:
                pass
        return receive_data

    def test_connection_not_authenticated(self):
        with self.assertRaises(ConnectionError):
            SocketIO('localhost', TEST_PORT, wait_for_connection=False)

    def test_connection_authenticated(self):
        r = requests.post("http://127.0.0.1:{}/auth/login".format(TEST_PORT), data=self.test_user)
        self.assertEqual(r.status_code, 200)

        with SocketIO('localhost', TEST_PORT, cookies={'session': r.cookies['session']},
                      wait_for_connection=False) as socketIO:
            self.assertTrue(socketIO.connected)

    def test_echo(self):
        expected_data = {"test_key": "test_value"}
        received_data = self.send_message('echo', 'echo_response', expected_data)
        self.assertEqual(received_data, expected_data)
