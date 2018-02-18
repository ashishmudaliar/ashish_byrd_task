import bcrypt
import aenum
from ticket_manager.database import db

class StatusEnum(aenum.Enum):
    Open = 1
    In_Progress = 2
    Completed = 3
    Rejected = 4

class UrgencyEnum(aenum.Enum):
    Low = 1
    Mid = 2
    High = 3

class UserData(db.Model):
    __tablename__ = "user_data"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True)
    password_hash = db.Column(db.String)
    email = db.Column(db.String)

    def __init__(self, username, password,email):
        self.username = username
        self.password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        self.email = email

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))


class Ticket(db.Model):
    __tablename__ = "ticket"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String)
    subject = db.Column(db.String)
    status = db.Column(db.Enum(StatusEnum),nullable=False)
    message = db.Column(db.Text)
    urgency = db.Column(db.Enum(UrgencyEnum))
    creation_date = db.Column(db.DateTime)

class Comment(db.Model):
    __tablename__ = "comment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user_data.id'))
    text = db.Column(db.Text)
    comment_date = db.Column(db.DateTime)
