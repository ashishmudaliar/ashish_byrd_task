from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from ticket_manager.app import create_app_for_db_connection
from ticket_manager.database import db

app = create_app_for_db_connection()
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
