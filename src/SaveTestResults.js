const SaveTestResults = async (device, serialNumber, testResult, pressureData, setUploadStatus) => {
  const testTimeInfo = new Date();
  const testResultJson = {
    type: "IQC",
    sub_type: "afc_module_inline_leak",
    Timestamp_UTC: Math.floor(testTimeInfo.getTime() / 1000),
    Date: testTimeInfo.toDateString(),
    Time: testTimeInfo.toTimeString(),
    device_id: device,
    serial_number: serialNumber,
    testResult: testResult,
    pressureData: pressureData
  };

  try {
    const response = await fetch('http://localhost:5000/upload_test_results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testResultJson),
    });

    if (response.ok) {
      setUploadStatus("Data uploaded successfully!");
    } else {
      setUploadStatus("Failed to upload data.");
    }
  } catch (error) {
    setUploadStatus("An error occurred while uploading.");
  }
};

export default SaveTestResults;
