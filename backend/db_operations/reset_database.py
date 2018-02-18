from ticket_manager import app
from ticket_manager.database import db

created_app = app.create_app_for_db_connection()
with created_app.app_context():
    db.drop_all()
    db.create_all()
