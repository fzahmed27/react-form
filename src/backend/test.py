# tests/test_app.py

import unittest
from app import app  

class FlaskTestCase(unittest.TestCase):

    def test_run_test(self):
        tester = app.test_client(self)
        response = tester.post('/run_test')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
