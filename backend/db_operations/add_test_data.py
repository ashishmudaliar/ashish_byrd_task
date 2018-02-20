from ticket_manager import app, models
from ticket_manager.database import db

created_app = app.create_app_for_db_connection()
with created_app.app_context():
    # add test user
    user = models.UserData("sampleuser1", "testpass","user1@xyz.de")
    db.session.add(user)
    user = models.UserData("sampleuser2", "testpass","user2@xyz.de")
    db.session.add(user)
    user = models.UserData("sampleuser3", "testpass","user3@xyz.de")
    db.session.add(user)
    db.session.commit()
