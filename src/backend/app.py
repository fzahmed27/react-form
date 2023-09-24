from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)

# Initialize CORS with the app and configure allowed origins
CORS(app, origins="http://localhost:3000/")

# Variable to simulate the solenoid valve state
solenoid_valve_open = False

@app.route('/run_test', methods=['GET', 'POST', 'OPTIONS'])
def run_test():
    global solenoid_valve_open
    
    if request.method == 'GET':
        pressure_data = 50
        response = jsonify({"message": "GET request successful", "pressure_data": pressure_data})

    elif request.method == 'POST':
        try:
            # Toggle the state of the solenoid valve
            solenoid_valve_open = not solenoid_valve_open

            if solenoid_valve_open:
                print("Opening solenoid valve...")
            else:
                print("Closing solenoid valve...")

            # Create a JSON response with the result
            response = jsonify({
                "message": f"Solenoid valve is {'open' if solenoid_valve_open else 'closed'}"
            })

        except Exception as e:
            response = jsonify({"error": str(e)}), 500  # Return an error response with a 500 status code

    # Set CORS headers for the response
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')

    return response

if __name__ == '__main__':
    app.run(debug=True)
