from flask import Flask
from flask_cors import CORS

from ticket_manager.database import db
from ticket_manager import models
from ticket_manager.authentication_handlers import auth
from ticket_manager.ticket_submission_api_handler import create_api


def create_app():
    app = Flask(__name__)
    app.config.from_envvar('CONFIG')
    db.init_app(app)
    CORS(app)
    app.register_blueprint(auth, url_prefix='/auth')
    ticket_submission_api = create_api(app)
    app.register_blueprint(ticket_submission_api, url_prefix='/api/tickets')
    return app

def create_app_for_db_connection():
    """Creates flask app and inits db without additional modules"""
    app = Flask(__name__)
    app.config.from_envvar('CONFIG')
    db.init_app(app)
    return app
