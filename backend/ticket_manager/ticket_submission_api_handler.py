from flask import request, Blueprint, Response
import json
import datetime

from ticket_manager import models
from ticket_manager.database import db

def create_api(app):
    ticket_submission_api = Blueprint('ticket_submission_api', __name__)

    @ticket_submission_api.route('/submit-ticket',methods=['POST'])
    def submit_ticket():
        try:
            email = request.form['email']
            subject = request.form['subject']
            message = request.form['message']
            urgency = request.form['urgency']
        except:
            return "Please fill all the columns", 400, {"Access-Control-Allow-Credentials": "true"}
        else:
            ticket = models.Ticket(
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
