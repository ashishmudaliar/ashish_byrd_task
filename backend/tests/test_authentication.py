import unittest
from ticket_manager.database import db
from ticket_manager.app import create_app
from ticket_manager import models

import sys


class TestAuthentication(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()

        cls.test_user = {'username': 'upload',
                         'password': 'test'}


    def setUp(self):

        if not self.app.config["TESTING"]:
            sys.exit("Testing mode is not enabled. Ensure that the testing configuration is used")

        self.test_client = self.app.test_client()

        with self.app.app_context():
            db.session.close()
            db.drop_all()
            db.create_all()

            user = models.UserData('upload','test','abc@xyz.de')
            db.session.add(user)
            db.session.commit()

    def test_access_denied(self):
        r = self.test_client.get("/auth/test")
        self.assertEqual(r.status_code, 401)

    def test_login_logout(self):
        r = self.test_client.post("/auth/login", data=self.test_user)
        self.assertEqual(r.status_code, 200)

        r = self.test_client.get("/auth/test")
        self.assertEqual(r.status_code, 200)

        r = self.test_client.post("/auth/logout")
        self.assertEqual(r.status_code, 200)

        r = self.test_client.get("/auth/test")
        self.assertEqual(r.status_code, 401)

    def test_login_invalid_username(self):
        r = self.test_client.post('/auth/login', data={'username': 'someuser', 'password': self.test_user['password']})
        self.assertEqual(r.status_code, 401)

        r = self.test_client.get('/auth/test')
        self.assertEqual(r.status_code, 401)

    def test_login_invalid_password(self):
        r = self.test_client.post('/auth/login', data={'username': self.test_user['username'], 'password': 'somepassword'})
        self.assertEqual(r.status_code, 401)

        r = self.test_client.get('/auth/test')
        self.assertEqual(r.status_code, 401)
