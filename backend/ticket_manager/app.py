from flask import Flask
from flask_cors import CORS

from ticket_manager.database import db
from ticket_manager import models
from ticket_manager.authentication_handlers import auth


def create_app():
    app = Flask(__name__)
    app.config.from_envvar('CONFIG')
    db.init_app(app)
    CORS(app)
    app.register_blueprint(auth, url_prefix='/auth')
    return app

def create_app_for_db_connection():
    """Creates flask app and inits db without additional modules"""
    app = Flask(__name__)
    app.config.from_envvar('CONFIG')
    db.init_app(app)
    return app
