from flask import request, Blueprint, Response
import json
import datetime

from ticket_manager import models
from ticket_manager.database import db

def create_api(app):
    ticket_submission_api = Blueprint('ticket_submission_api', __name__)

    def validate_text(text):
        if text == '':
            return False
        return True

    def validate(data):
        if not validate_text(data['name']):
            return False
        if not validate_text(data['subject']):
            return False
        if not validate_text(data['message']):
            return False
        if not validate_text(data['urgency']):
            return False
        if not validate_text(data['email']):
            return False
        return True

    @ticket_submission_api.route('/submit-ticket',methods=['POST'])
    def submit_ticket():
        try:
            if not validate(request.form):
                return "Please fill all the columns", 400, {"Access-Control-Allow-Credentials": "true"}
            name = request.form['name']
            email = request.form['email']
            subject = request.form['subject']
            message = request.form['message']
            urgency = request.form['urgency']
        except:
            return "Please fill all the columns", 400, {"Access-Control-Allow-Credentials": "true"}
        else:
            ticket = models.Ticket(
                name=name,
                email=email,
                subject=subject,
                message=message,
                urgency=models.UrgencyEnum[urgency],
                status=models.StatusEnum.Open,
                creation_date=datetime.datetime.now()
            )
            db.session.add(ticket)
            db.session.commit()
            return "Ticket added succesfully", 200, {"Access-Control-Allow-Credentials": "true"}

    return ticket_submission_api
