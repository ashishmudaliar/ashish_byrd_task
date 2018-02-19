import os
import sys

# add the root backend path in order to be able to import ticket_manager
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))

from ticket_manager.app import create_app
from tests.utils import TEST_PORT

if __name__ == '__main__':
    sio, app = create_app()

    print('--- Starting Test Web and Socket Server on port {} ---'.format(TEST_PORT))
    sio.run(app, port=TEST_PORT)
