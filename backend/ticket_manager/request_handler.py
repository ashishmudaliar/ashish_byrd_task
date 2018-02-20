import eventlet
import logging
import json
import datetime

from ticket_manager import models

class RequestHandler:
    def __init__(self, db_session,config):
        self.config = config
        self.session = db_session


    def handle_request(self, request, username, handle_async_request_wrapper):
        logging.info("Socket Request from {}: {}".format(username, request))
        if "id" in request and "type" in request and request["type"] in self.requests:
            request_method = self.requests[request["type"]]
            eventlet.spawn_n(handle_async_request_wrapper,
                             self.handle_async_request,
                             request_method, request, username)
            response = None
        else:
            response = { "status": "fail", "message": "Invalid/Unknown Request"}
        return response

    def handle_async_request(self, request_method, request, username):
        response = {}
        response["id"] = request["id"]
        response["type"] = request["type"]
        try:
            data = request.get("data", {})
            response_data = request_method(self, data, username)
            response["status"] = "success"
            response["data"] = response_data
        except:
           response["status"] = "fail"
        return response

    def get_tickets(self,data,username):
        print('get_tickets')
        ticket_list = []
        tickets = models.Ticket.query.all()
        for ticket in tickets:
            ticket_data = {}
            ticket_data['id'] = ticket.id
            print(ticket.name)
            ticket_data['name'] = ticket.name
            ticket_data['email'] = ticket.email
            ticket_data['subject'] = ticket.subject
            ticket_data['status'] = ticket.status
            ticket_data['urgency'] = ticket.urgency
            ticket_data['creation_date'] = ticket.creation_date.strftime('%Y-%m-%dT%H:%M:%SZ')
            ticket_list.append(ticket_data)
        response = {}
        response['jsons'] = ticket_list
        return response

    def get_ticket_details(self,ticket_id):
        ticket_data = {}
        ticket = models.Ticket.query.filter(models.Ticket.id == ticket_id).first()
        ticket_data['id'] = ticket.id
        ticket_data['subject'] = ticket.subject
        ticket_data['status'] = ticket.status
        ticket_data['urgency'] = ticket.urgency
        ticket_data['text'] = ticket.message
        ticket_data['email'] = ticket.email
        ticket_data['name'] = ticket.name
        ticket_data['creation_date'] = ticket.creation_date.strftime('%Y-%m-%dT%H:%M:%SZ')
        comments = (
                self.session.query(
                models.Comment,models.UserData)
                .filter(models.Comment.ticket_id == ticket.id)
                .join(models.UserData,models.Comment.user_id == models.UserData.id)
                .all())
        comment_list = []
        for comment in comments:
            comment_object = {}
            comment_object['id'] = comment[0].id
            comment_object['text'] = comment[0].text
            comment_object['date'] = comment[0].comment_date.strftime('%Y-%m-%dT%H:%M:%SZ')
            comment_object['user'] = comment[1].username
            comment_list.append(comment_object)
        ticket_data['comments'] = comment_list
        return ticket_data

    def get_ticket_data(self,data,username):
        print('get_ticket_data')
        ticket_id = data['ticket_id']
        ticket_data = self.get_ticket_details(ticket_id)
        response = {}
        response['jsons'] = ticket_data
        return response

    def change_urgency(self,data,username):
        print('change_urgency')
        ticket_id = data['ticket_id']
        urgency = data['urgency']
        ticket = models.Ticket.query.filter(models.Ticket.id == ticket_id).first()
        ticket.urgency = urgency
        self.session.commit()
        response = {}
        response['jsons'] = 'Urgency updated'
        return response

    def change_status(self,data,username):
        print('change_status')
        ticket_id = data['ticket_id']
        status = data['status']
        ticket = models.Ticket.query.filter(models.Ticket.id == ticket_id).first()
        ticket.status = status
        self.session.commit()
        response = {}
        response['jsons'] = 'Status updated'
        return response

    def add_comment(self,data,username):
        print('add_comment')
        ticket_id = data['ticket_id']
        text = data['text']
        user = models.UserData.query.filter(models.UserData.username==username).first()
        comment = models.Comment(
            ticket_id=ticket_id,
            user_id=user.id,
            text=text,
            comment_date=datetime.datetime.now())
        self.session.merge(comment)
        self.session.commit()
        response = {}
        ticket_data = self.get_ticket_details(ticket_id)
        response['jsons'] = ticket_data
        return response

    # allowed requests
    requests = {
        "get_tickets":get_tickets,
        "add_comment":add_comment,
        "get_ticket_data":get_ticket_data,
        "change_urgency":change_urgency,
        "change_status":change_status,
    }
