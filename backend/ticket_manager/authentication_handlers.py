import logging
import datetime
from flask import session, request, abort, Blueprint

import ticket_manager.models as models
from ticket_manager.database import db

auth = Blueprint('auth', __name__)

@auth.before_request
def before_request():
    with open("/tmp/logfile.txt", "w") as fout:
        fout.write("---------------------")
        fout.write(str(session.get('username')))
        fout.write(str(request.endpoint))

    if 'username' not in session and request.endpoint != 'auth.login':
        logging.info('Access denied')
        abort(401)


@auth.route("/test")
def hello():
    logging.info("test")
    return "test"

@auth.route('/login', methods=['POST'])
def login():
    logging.info('login attempt by {}'.format(request.form['username']))
    username = request.form['username']
    user = models.UserData.query.filter(models.UserData.username == username).first()
    if user is not None and user.check_password(request.form['password']):
        session['username'] = username
        logging.info("Login by user = {}".format(username))
        return "OK", 200, {"Access-Control-Allow-Credentials": "true"}
    else:
        logging.info("Login denied for user = {}".format(username))
        abort(401)

@auth.route('/logout', methods=['POST'])
def logout():
    logging.info("Logout by user = {}".format(session.get('username')))
    session.pop('username', None)
    return 'Logged out', 200, {"Access-Control-Allow-Credentials": "true"}
