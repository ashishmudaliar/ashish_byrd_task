import os
import subprocess

TEST_PORT = 9000


class ServerProcess:
    def __init__(self):
        # adjust the path depending on whether the tests are started via test discovery (working directory tests) or
        # or via the run_tests.py script
        if os.path.basename(os.getcwd()) == "tests":
            run_server_script = "run_test_server.py"
        else:
            run_server_script = "tests/run_test_server.py"
        self.p = subprocess.Popen(["python3", run_server_script])

    def terminate(self):
        self.p.terminate()
