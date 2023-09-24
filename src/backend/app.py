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
        # Handle the GET request here
        # Replace with actual logic to retrieve or generate pressure data
        pressure_data = 50
        response = jsonify({"message": "GET request successful", "pressure_data": pressure_data})

    elif request.method == 'POST':
        try:
            # Check the current state of the solenoid valve
            if solenoid_valve_open:
                response = jsonify({"message": "Solenoid valve is already open"})
            else:
                # Simulate opening the solenoid valve (this is just a simulation)
                print("Opening solenoid valve...")
                time.sleep(5)  # Simulate the time it takes to open the valve

                # Update the solenoid valve state
                solenoid_valve_open = True

                # Read pressure data
                # Replace with actual logic to read pressure data
                pressure_data = 50

                # Create a JSON response with the result
                response = jsonify({"message": "POST request successful", "pressure_data": pressure_data})

        except Exception as e:
            # Handle any exceptions that may occur during the POST request handling
            response = jsonify({"error": str(e)}), 500  # Return an error response with a 500 status code

    # Set CORS headers for the response
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Adjust the origin as needed
    response.headers.add('Access-Control-Allow-Credentials', 'true')

    return response

if __name__ == '__main__':
    app.run(debug=True)
