import unittest
from ticket_manager.database import db
from ticket_manager.app import create_app
from ticket_manager import models

import sys


class TestTicketSubmissionAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()[1]

    def setUp(self):

        if not self.app.config["TESTING"]:
            sys.exit("Testing mode is not enabled. Ensure that the testing configuration is used")

        self.test_client = self.app.test_client()

        with self.app.app_context():
            db.session.close()
            db.drop_all()
            db.create_all()

    def test_valid_ticket_submit(self):

        with self.app.app_context():
            testticket_data = {'name': 'Ashish',
                             'email': 'ashish@xyz.de',
                             'subject': 'Test Ticket Subject',
                             'message': 'Test Ticket Message',
                             'urgency': 'Low'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.one()
            self.assertEqual(ticket.urgency, 'Low')

    def test_ticket_submit_no_email(self):
        with self.app.app_context():
            testticket_data = {'name': 'Ashish',
                             'subject': 'Test Ticket Subject',
                             'message': 'Test Ticket Message',
                             'urgency': 'Low'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_no_subject(self):
        with self.app.app_context():
            testticket_data = {'name': 'Ashish',
                             'email': 'ashish@xyz.de',
                             'message': 'Test Ticket Message',
                             'urgency': 'Low'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_no_message(self):
        with self.app.app_context():
            testticket_data = {'name': 'Ashish',
                             'subject': 'Test Ticket Subject',
                             'email': 'ashish@xyz.de',
                             'urgency': 'Low'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_no_urgency(self):
        with self.app.app_context():
            testticket_data = {'name': 'Ashish',
                             'subject': 'Test Ticket Subject',
                             'message': 'Test Ticket Message',
                             'email': 'ashish@xyz.de'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_blank_email(self):
        with self.app.app_context():
            testticket_data = {'email':'',
                             'subject': 'Test Ticket Subject',
                             'message': 'Test Ticket Message',
                             'urgency': 'Low'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_blank_subject(self):
        with self.app.app_context():
            testticket_data = {'urgency': 'Low',
                             'subject': '',
                             'message': 'Test Ticket Message',
                             'email': 'ashish@xyz.de'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_blank_message(self):
        with self.app.app_context():
            testticket_data = {'urgency': 'Low',
                             'subject': 'Test Ticket Subject',
                             'message': '',
                             'email': 'ashish@xyz.de'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)

    def test_ticket_submit_blank_urgency(self):
        with self.app.app_context():
            testticket_data = {'urgency': '',
                             'subject': 'Test Ticket Subject',
                             'message': 'Test Ticket Message',
                             'email': 'ashish@xyz.de'}
            self.test_client.post('api/tickets/submit-ticket',
                                  data=testticket_data)
            ticket = models.Ticket.query.first()
            self.assertIsNone(ticket)
