import unittest
import sys
import os
import datetime
import requests

# from tests.utils import ServerProcess, StopWaitingException, TEST_PORT
from ticket_manager import models
from ticket_manager.database import db
from ticket_manager.app import create_app
from ticket_manager.request_handler import RequestHandler

from time import sleep

TEST_PORT = 9000
receive_data = None

class TestRequestHandler(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.test_user = {'username': 'upload',
                         'password': 'test'}
        cls.app = create_app()[1]
        cls.request_handler = RequestHandler(db.session, cls.app.config)

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

            ticket = models.Ticket(
                name='Ashish',
                email='ashish@asd.de',
                subject='Test Ticket',
                message='Test Ticket message',
                status='Open',
                urgency='Low',
                creation_date=datetime.datetime.now()
                )
            db.session.add(ticket)
            db.session.commit()

            comment = models.Comment(
                ticket_id=ticket.id,
                user_id=user.id,
                text='Text comment',
                comment_date=datetime.datetime.now()
            )
            db.session.add(comment)
            db.session.commit()

    def test_get_tickets(self):
        with self.app.app_context():
            data = {}
            tickets = self.request_handler.get_tickets(data,'upload')
            self.assertEqual(len(tickets['jsons']),1)

    def test_get_ticket_data(self):
        with self.app.app_context():
            data = {}
            data['ticket_id'] = 1
            ticket_data = self.request_handler.get_ticket_data(data,'upload')
            self.assertEqual(len(ticket_data['jsons']['comments']),1)

    def test_change_urgency(self):
        with self.app.app_context():
            data = {}
            data['ticket_id'] = 1
            data['urgency'] = 'High'
            self.request_handler.change_urgency(data,'upload')
            data = {}
            data['ticket_id'] = 1
            ticket_data = self.request_handler.get_ticket_data(data,'upload')
            self.assertEqual(ticket_data['jsons']['urgency'],'High')

    def test_change_status(self):
        with self.app.app_context():
            data = {}
            data['ticket_id'] = 1
            data['status'] = 'In Progress'
            self.request_handler.change_status(data,'upload')
            data = {}
            data['ticket_id'] = 1
            ticket_data = self.request_handler.get_ticket_data(data,'upload')
            self.assertEqual(ticket_data['jsons']['status'],'In Progress')

    def test_add_comment(self):
        with self.app.app_context():
            data = {}
            data['ticket_id'] = 1
            data['text'] = 'Test comment 2'
            self.request_handler.add_comment(data,'upload')
            data = {}
            data['ticket_id'] = 1
            ticket_data = self.request_handler.get_ticket_data(data,'upload')
            self.assertEqual(len(ticket_data['jsons']['comments']),2)
