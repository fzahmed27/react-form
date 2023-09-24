import React, { useState } from 'react';

const App = () => {
  const [partNumbers, setPartNumbers] = useState({
    device1: '',
    device2: '',
    device3: '',
    device4: ''
  });
  const [pressureData, setPressureData] = useState(null);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [retestCount, setRetestCount] = useState(0);
  const [isRetest, setIsRetest] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartNumbers({
      ...partNumbers,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTestRunning(true);
    setPressureData(null);
    setTestResult(null);

    if (pressureData !== null) {
      setIsRetest(true);
      setRetestCount(retestCount + 1);
    }

    // Call the Flask backend to run the test
    try {
      const response = await fetch('http://localhost:5000/run_test', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setPressureData(data.pressure_data);

        if (data.pressure_data >= 40 && data.pressure_data <= 60) {
          setTestResult('Pass');
        } else {
          setTestResult('Fail');
        }
      } else {
        console.log("Failed to run test.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }

    setIsTestRunning(false);
  };

  const stopTest = () => {
    clearTimeout(timeoutId);
    setIsTestRunning(false);
  };

  const clearFields = () => {
    setPartNumbers({
      device1: '',
      device2: '',
      device3: '',
      device4: ''
    });
    setPressureData(null);
    setTestResult(null);
    setRetestCount(0);
    setIsRetest(false);
  };

  const allFieldsFilled = Object.values(partNumbers).every((field) => field !== '');

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>AFC Inline Leak Test</h1>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        {Object.keys(partNumbers).map((device, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>{device.toUpperCase()}: </label>
            <input
              type="text"
              name={device}
              value={partNumbers[device]}
              onChange={handleChange}
              disabled={isTestRunning}
            />
          </div>
        ))}
        <button type="submit" disabled={!allFieldsFilled || isTestRunning}>
          Run Test
        </button>
        <button type="button" onClick={stopTest} disabled={!isTestRunning}>
          Stop Test
        </button>
        <button type="button" onClick={clearFields}>
          Clear All Fields
        </button>
      </form>
      {isTestRunning && <p>Test Running...</p>}
      {isRetest && <p>Retest Count: {retestCount}</p>}
      {pressureData && <p>Pressure Data: {pressureData} PSI</p>}
      {testResult && <p>Test Result: {testResult}</p>}
    </div>
  );
};

export default App;
