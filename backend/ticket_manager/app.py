from flask import Flask
from flask_cors import CORS
from ticket_manager.database import db

def create_app():
    app = Flask(__name__)
    app.config.from_envvar('CONFIG')
    db.init_app(app)
    CORS(app)
    return app
