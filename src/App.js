import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [solenoidState, setSolenoidState] = useState(false);

  // Function to handle the POST request to toggle the solenoid valve
  const toggleSolenoidValve = async () => {
    try {
      const response = await fetch('http://localhost:5000/run_test', {
        method: 'POST',
      });

      if (response.status === 200) {
        const data = await response.json();
        setMessage(data.message);
        // Toggle the solenoid state when the POST request is successful
        setSolenoidState((prevState) => !prevState);
      } else {
        setMessage('Failed to toggle solenoid valve');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
        <p>Message from Flask API:</p>
        <p>{message}</p>
        <p>Solenoid Valve State: {solenoidState ? 'Open' : 'Closed'}</p>
        <button onClick={toggleSolenoidValve}>
          {solenoidState ? 'Close Solenoid Valve' : 'Open Solenoid Valve'}
        </button>
      </header>
    </div>
  );
}

export default App;
