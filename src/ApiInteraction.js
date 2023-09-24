import React, { useState } from 'react';

function ApiInteraction() {
  const [response, setResponse] = useState(null);

  const runTest = async () => {
    try {
      const response = await fetch('http://localhost:5000/run_test', {
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data); // Set the response state with the received data
    } catch (error) {
      console.error('Error:', error.message); // Log the error message
      setResponse(null); // Clear the response state in case of an error
    }
  };

  return (
    <div>
      <button onClick={runTest}>Run Test</button>
      {response && (
        <div>
          <p>Message: {response.message}</p>
          <p>Pressure Data: {response.pressure_data}</p>
        </div>
      )}
    </div>
  );
}

export default ApiInteraction;
